import { NextFunction, Request, Response } from 'express';
import httpResponse from '../../util/httpResponse';
import responseMessage from '../../constants/responseMessage';
import httpError from '../../util/httpError';
import {
  createSheet,
  getAllSheetsOfOwner,
  removeSheet,
  updateSheetName,
} from '../../service/sheet/sheetService';

export default {
  async createNewSheet(req: Request, res: Response, next: NextFunction) {
    const { filename, userID } = req.body;
    console.log(req.body); // Check the incoming request body

    if (!filename) {
      return httpError(next, 'Filename must be provided', req, 422);
    }

    // Specifically check for null or undefined instead of falsy values
    if (userID === null || userID === undefined) {
      return httpError(next, 'userID must be provided', req, 422);
    }

    try {
      const sheetMetadata = await createSheet(filename, userID);

      if (sheetMetadata) {
        return httpResponse(
          req,
          res,
          200,
          responseMessage.SUCCESS,
          sheetMetadata
        );
      } else {
        return httpError(next, 'File not Created', req, 502);
      }
    } catch (err: any) {
      return httpError(next, `Error creating sheet: ${err.message}`, req, 500);
    }
  },
  getAllSheet(req: Request, res: Response, next: NextFunction) {
    const { userID } = req.params;
    if (!userID) return httpError(next, 'userID must be provided', req, 422);

    const sheets = getAllSheetsOfOwner(parseInt(userID));
    return httpResponse(req, res, 200, responseMessage.SUCCESS, sheets);
  },
  //   getSheetData(req: Request, res: Response, next: NextFunction) {},
  updateSheetNameByID(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.body;
    if (!name) return httpError(next, 'New Name must be provided', req, 422);
    if (!id) return httpError(next, 'FileID must be provided', req, 422);
    const updatedSheet = updateSheetName(id, name);
    return httpResponse(req, res, 200, responseMessage.SUCCESS, updatedSheet);
  },
  deleteSheetByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    if (!id) return httpError(next, 'FileID must be provided', req, 422);
    const deletedSheet = removeSheet(id);
    return httpResponse(req, res, 200, responseMessage.SUCCESS, deletedSheet);
  },
};

