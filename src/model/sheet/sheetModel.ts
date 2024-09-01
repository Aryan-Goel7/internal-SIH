import { TSheet } from '../../types/types';
import logger from '../../util/logger';
let sheets: Array<TSheet> = [];

const addSheet = (sheet: TSheet) => {
  sheets.push(sheet);
};

const deleteSheet = (id: number) => {
  sheets = sheets.filter((sheet) => sheet.id === id);
};

const getSheet = (id: number) => {
  return sheets[id];
};

const updateSheetData = (id: number, data: unknown) => {
  console.log(id);
  logger.info('UPDATED SHEET MODAL', data);
};

const updateSheetNameUsingID = (id: number, data: string | unknown) => {
  sheets = sheets.map((sheet) => {
    if (sheet.id === id) sheet.name = data as string;
    return sheet;
  });

  return sheets[id];
};

const ownerSheets = (owner: number) => {
  const ownedSheets = sheets.filter((sheet) => sheet.owner === owner);
  return ownedSheets;
};

export {
  addSheet,
  getSheet,
  updateSheetData,
  updateSheetNameUsingID,
  deleteSheet,
  ownerSheets,
};

