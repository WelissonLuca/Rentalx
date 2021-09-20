import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    console.log(images);
    const uploadCarImageUse = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageUse.execute({
      car_id: id,
      images_name,
    });

    return response
      .status(201)
      .json({ message: 'Imagens enviadas com sucesso' });
  }
}

export { UploadCarImageController };
