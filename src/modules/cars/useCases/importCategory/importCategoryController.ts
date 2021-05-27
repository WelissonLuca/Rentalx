import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    const { file } = request;
    importCategoryUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoryController };
