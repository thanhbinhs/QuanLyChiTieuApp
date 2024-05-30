import userData from "../data/user.json"
import NoteData from "../data/note.json"
import AccountData from "../data/account.json"

function balanceUser(userId){
    let income = 0;
    let expense = 0;
    NoteData.forEach((note) => {
        if (note.userId === userId) {
           AccountData.forEach((account, index) => {
               if (account.userId === userId && account.accountId === note.accountId) {
                   if (note.noteType === 'Thu') {
                       account.income += note.noteMoney;
                   }else{
                          account.expense += note.noteMoney;
                   }
               }
           });
        }
    });

    AccountData.forEach((account) => {
        if (account.userId === userId) {
            income += account.income;
            expense += account.expense;
        }
    });
    return {income, expense};
}

export {balanceUser}