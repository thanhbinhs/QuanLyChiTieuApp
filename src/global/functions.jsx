import { parseISO, format, getMonth, getYear, startOfWeek, endOfWeek, isSameDay, isWithinInterval } from "date-fns";

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

