import { parseISO, format, getMonth, getYear, startOfWeek, endOfWeek, isSameDay, isWithinInterval, startOfMonth, endOfMonth  } from "date-fns";

export const timestampToDate = (timestamp) => {
  if (
    !timestamp ||
    typeof timestamp.seconds !== "number" ||
    typeof timestamp.nanoseconds !== "number"
  )
    return null;
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  return new Date(milliseconds);
};

// Hàm để nhóm các ghi chú theo ngày và tính tổng số ghi chú
export const groupNotesByDate = (notes) => {
  const grouped = notes.reduce((groups, note) => {
    const date = timestampToDate(note.createdAt);
    if (!date || isNaN(date)) {
      console.error("Invalid date:", note.createdAt);
      return groups;
    }
    const dateString = format(date, "yyyy-MM-dd");
    if (!groups[dateString]) {
      groups[dateString] = { notes: [], total: 0 };
    }
    groups[dateString].notes.push(note);
    if (note.noteType === "Chi tiền") {
      groups[dateString].total -= note.noteMoney;
    } else {
      groups[dateString].total += note.noteMoney;
    }
    return groups;
  }, {});
  // Sắp xếp các ghi chú trong mỗi nhóm ngày theo thứ tự giảm dần
  Object.values(grouped).forEach((group) => {
    group.notes.sort(
      (a, b) => timestampToDate(b.createdAt) - timestampToDate(a.createdAt)
    );
  });

  // Chuyển đổi đối tượng `grouped` thành mảng các cặp khóa-giá trị và sắp xếp mảng theo thứ tự giảm dần
  const sortedArray = Object.entries(grouped).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );

  // Chuyển đổi mảng đã sắp xếp trở lại thành đối tượng
  return Object.fromEntries(sortedArray);
};

// Hàm để lấy ngày (DD) từ createdAt
export const getDayFromDate = (timestamp) => {
  const date = timestampToDate(timestamp);
  return date && !isNaN(date) ? format(date, "dd") : "";
};

// Hàm để lấy tháng (MM) từ createdAt
export const getMonthFromDate = (timestamp) => {
  const date = timestampToDate(timestamp);
  return date && !isNaN(date) ? format(date, "MM") : "";
};

// Hàm để lấy năm (YYYY) từ createdAt
export const getYearFromDate = (timestamp) => {
  const date = timestampToDate(timestamp);
  return date && !isNaN(date) ? format(date, "yyyy") : "";
};

// Mảng chứa các ngày trong tuần bằng tiếng Việt
const daysOfWeek = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

// Hàm để lấy thứ từ chuỗi ngày định dạng yyyy-MM-dd
export const getDayOfWeekFromDateString = (dateString) => {
  const date = parseISO(dateString);
  return date && !isNaN(date) ? daysOfWeek[date.getDay()] : "";
};


// Hàm để lọc các ghi chú của tháng hiện tại

export const filterCurrentMonthNotes = (notes) => {
  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);
  return notes.filter(note => {
    const date = timestampToDate(note.createdAt);
    return date && getMonth(date) === currentMonth && getYear(date) === currentYear;
  });
};

export const filterCurrentWeekNotes = (notes) => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // Tuần bắt đầu từ Thứ 2
  const end = endOfWeek(now, { weekStartsOn: 1 });
  
  return notes.filter(note => {
    const date = timestampToDate(note.createdAt);
    return date && isWithinInterval(date, { start, end });
  });
};
// Hàm để lọc các ghi chú của ngày hôm nay
export const filterTodayNotes = (notes) => {
    const now = new Date();
    return notes.filter(note => {
      const date = timestampToDate(note.createdAt);
      return date && isSameDay(date, now);
    });
  };

// Hàm để lọc các ghi chú theo ngày bất kỳ
export const filterNotesByDate = (notes, specificDate) => {
  const dateToCompare = new Date(specificDate); // Chuyển đổi chuỗi ngày cụ thể sang Date object
  return notes.filter(note => {
    const noteDate = timestampToDate(note.createdAt);
    return noteDate && isSameDay(noteDate, dateToCompare);
  });
};

// Hàm để lọc các ghi chú theo số tuần của năm
export const filterNotesByWeek = (notes, weekNumber, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const firstWeekStart = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
  const weekStart = new Date(firstWeekStart.setDate(firstWeekStart.getDate() + (weekNumber - 1) * 7));
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  return notes.filter(note => {
    const noteDate = timestampToDate(note.createdAt);
    return noteDate >= weekStart && noteDate <= weekEnd;
  });
};


// Hàm để lọc các ghi chú theo tháng
export const filterNotesByMonth = (notes, year, month) => {
  const start = startOfMonth(new Date(year, month - 1)); // month - 1 vì tháng trong JavaScript bắt đầu từ 0
  const end = endOfMonth(new Date(year, month - 1));
  
  return notes.filter(note => {
    const noteDate = timestampToDate(note.createdAt);
    return isWithinInterval(noteDate, { start, end });
  });
};

// Hàm để lọc các ghi chú theo khoảng ngày tùy chọn
export const filterNotesByCustomRange = (notes, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return notes.filter(note => {
    const noteDate = timestampToDate(note.createdAt);
    return isWithinInterval(noteDate, { start, end });
  });
};

// Hàm để lọc ghi chú theo phạm vi ngày
export const filterByRange = (notes, selectedDates) => {
  const selectedDays = Object.keys(selectedDates).map(dateString => new Date(dateString));

  return notes.filter(note => {
    const noteDate = timestampToDate(note.createdAt);
    return selectedDays.some(day => format(noteDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
  });
};
