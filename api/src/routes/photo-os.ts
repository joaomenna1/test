import { FastifyInstance } from "fastify";
import { authMiddleware } from "@/middlewares/auth";
import { uploadServiceOrderPhotoService } from "@/services/upload-photo-os-service";
import { DbClient, db } from "@/db/index"; 

type UploadPhotoParams = {
  id: string;
};

export async function uploadServiceOrderPhotoRoutes(app: FastifyInstance) {
  app.post<{
    Params: UploadPhotoParams;
  }>(
    "/service-orders/:id/photo",
    {
      preHandler: authMiddleware,
      schema: {
        summary: "Upload photo for a service order",
        tags: ["Service Orders"],
      },
    },
    async (request, reply) => {
      try {
        const file = await request.file();
        if (!file) {
          return reply.status(400).send({ message: "No file uploaded" });
        }


        const client: DbClient = db;

        const photoUrl = await uploadServiceOrderPhotoService({
          client,
          file,
          serviceOrderId: request.params.id,
          userId: request.user.sub,
        });

        return reply.status(201).send({ photoUrl });
      } catch (err: any) {
        return reply.status(400).send({ message: err.message });
      }
    });
}
