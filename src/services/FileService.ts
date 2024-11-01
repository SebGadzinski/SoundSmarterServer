/**
 * @file File System related functionality.
 * @author Sebastian Gadzinski
 */

import fs from 'fs/promises';
import multer from 'multer';
import * as path from 'path';
import config from '../config';
import { FileResult } from '../interfaces';

async function toJsonFile(data: any, fileName: string, userId: string): Promise<FileResult> {
    const jsonData = JSON.stringify(data);

    // Create a file name for the JSON file
    const jsonFileName = `${fileName}.json`;
    const workingDir = path.resolve(config.tempDir, 'JsonData', userId);
    await fs.rm(workingDir, { recursive: true, force: true });
    await fs.mkdir(workingDir, { recursive: true });
    const filePath = path.join(workingDir, jsonFileName);

    // Write the JSON string to a file
    await fs.writeFile(filePath, jsonData);

    // Read the file you just wrote to the file system to get its Buffer
    const fileBuffer = await fs.readFile(filePath);

    // Create a multer file-like object
    const jsonFile: multer.File = {
        fieldname: 'jsondata',
        originalname: jsonFileName,
        encoding: '7bit',
        mimetype: 'application/json',
        buffer: fileBuffer,
        size: fileBuffer.length
    };

    return { file: jsonFile, errors: {} };
}

const fileService = { toJsonFile };

export default fileService;
