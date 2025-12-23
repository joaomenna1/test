import path from "path";
import fs from "fs/promises";
import { DbClient } from "@/db/index";
import { updateServiceOrderPhotoTx } from "@/repositories/os-photo-repository";

// define o tipo do arquivo
type MultipartFile = {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  toBuffer: () => Promise<Buffer>;
};

export async function uploadServiceOrderPhotoService({
  client,
  file,
  serviceOrderId,
  userId,
}: {
  client: DbClient;
  file: MultipartFile; // usa o tipo definido acima
  serviceOrderId: string;
  userId: string;
}) {
  // valida tipo
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Invalid file type");
  }

  // cria pasta uploads se não existir
  const uploadDir = path.resolve("./uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // gera nome único
  const fileName = `${Date.now()}-${file.filename}`;
  const filePath = path.join(uploadDir, fileName);

  // salva o arquivo
  const buffer = await file.toBuffer();
  await fs.writeFile(filePath, buffer);

  // salva path/URL no banco usando Drizzle
  const [updatedOrder] = await updateServiceOrderPhotoTx(client, {
    serviceOrderId,
    userId,
    photoUrl: `/uploads/${fileName}`,
  });

  return updatedOrder.photoUrl;
}
