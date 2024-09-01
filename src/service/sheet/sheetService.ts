import fs from 'fs/promises';
import path from 'path';
import storage from '../../constants/storage';
import { TSheet } from '../../types/types';
import {
  addSheet,
  deleteSheet,
  getSheet,
  ownerSheets,
  updateSheetNameUsingID,
} from '../../model/sheet/sheetModel';
import logger from '../../util/logger';

let id = 0;

const createSheet = async (name: string, owner: number) => {
  try {
    // console.log(__dirname);
    const folderPath = path.join(
      __dirname,
      '/..',
      '/..',
      '/..',
      storage.mainStorage,
      owner.toString(),
      name
    );
    console.log(folderPath);
    await fs.mkdir(folderPath, { recursive: true });
    const tmpFilePath = path.join(folderPath, `${storage.tmpStorage}.xlsx`);
    const filePath = path.join(folderPath, 'sheet_v0.xlsx');
    await Promise.all([
      fs.writeFile(tmpFilePath, '', 'utf-8'),
      fs.writeFile(filePath, '', 'utf-8'),
    ]);
    // const folderPath = 'arasd',
    // const tmpFilePath = 'asasf';
    const newSheet: TSheet = {
      name,
      id,
      owner,
      path: folderPath,
      tmp_path: tmpFilePath,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    };
    id++;
    addSheet(newSheet);
    return newSheet;
  } catch (err) {
    logger.info('Sheet Creation Service Error', {
      meta: {
        err,
      },
    });
    return null;
  }
};
const updateSheetName = (id: number, name: string) => {
  return updateSheetNameUsingID(id, name);
};
const updateSheetRowColData = (
  id: number,
  data: {
    row: number;
    col: number;
    newValue: string;
  }
) => {
  const sheetMetaData = getSheet(id);
  console.log(sheetMetaData, data);
  // TODO: Reading Data from the file directory

  const sheetData = '';
  return sheetData;
};

const removeSheet = async (sheetId: number) => {
  try {
    const sheetMetaData = getSheet(sheetId);

    if (!sheetMetaData) {
      logger.info('DELETE SHEET SERVICE', {
        meta: {
          error: 'SHEET NOT FOUND',
        },
      });
      return null;
    }

    const filePath = sheetMetaData.path;

    try {
      await fs.access(filePath);
      await fs.rm(filePath);
      deleteSheet(sheetId);
      logger.info('DELETED FILE SUCCESSFULLY');
    } catch (fileError: any) {
      // Handle file errors (e.g., file not found or permission issues)
      logger.info('DELETE SHEET SERVICE', {
        meta: {
          error: `FILE ERROR: ${fileError.message}`,
        },
      });
      return null;
    }

    return sheetMetaData;
  } catch (err: any) {
    logger.info('DELETE SHEET SERVICE', {
      meta: {
        error: err.message,
      },
    });
    return null;
  }
};

const readSheet = (sheetId: number) => {
  const sheetMetaData = getSheet(sheetId);
  console.log(sheetMetaData);
  // TODO: Read data from the file Directory
};

const getAllSheetsOfOwner = (owner: number) => {
  return ownerSheets(owner);
};

export {
  createSheet,
  updateSheetName,
  updateSheetRowColData,
  getAllSheetsOfOwner,
  removeSheet,
  readSheet,
};

