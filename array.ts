import * as _ from 'lodash';


interface IPredicate<T> {
  (t: T): boolean;
}


export function copyListWithReplace<T>(listT: T[], index: number, newObj: T) {
  return listT
    .slice(0, index)
    .concat([newObj])
    .concat(listT.slice(index + 1, listT.length));
}


export function copyListExcludingIndex<T>(listT: T[], index: number): T[] {
  return listT.slice(0, index).concat(listT.slice(index + 1, listT.length));
}


export function findIndexByPredicate<T>(list: T[], predicate: IPredicate<T>): number {
  return _.findIndex(list, predicate);
}


export function updateEntryByPredicateAndCopyList<T, TPartial>(
  listT: T[], predicate: IPredicate<T>, update: TPartial): T[] {
  var index = findIndexByPredicate(listT, predicate);
  if(index === -1) throw new Error('No entry found with predicate');

  var updatedObj = _.assign<any, T>({}, listT[index], update);

  return copyListWithReplace<T>(listT, index, updatedObj);
}


export function updateEntriesByPredicateAndCopyList<T>(
  listT: T[], predicate: IPredicate<T>, updateFn: ((item: T) => T)): T[] {
  var newList: T[] = [];
  var changedList = false;
  for(var i = 0, len = listT.length; i < len; ++i) {
    var item = listT[i];
    if(predicate(item)) {
      changedList = true;
      newList.push(updateFn(item));
    } else {
      newList.push(item);
    }
  }
  if(!changedList) newList = listT;
  return newList;
}
