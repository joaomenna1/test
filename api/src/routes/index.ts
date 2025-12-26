import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { checklistRoutes } from "@/routes/checklist";
import { uploadServiceOrderPhotoRoutes } from "./photo-os";
import { listServiceOrderRoutes } from "./list-os-by-user-logged";
import { CreateServiceOrderRoutes } from "./create-os";
import { serviceOrderByIdRoutes } from "./list-os-by-id";


export  function registerRoutes(app: FastifyInstance) {
   app.register(authRoutes)
   app.register(checklistRoutes);
   app.register(CreateServiceOrderRoutes);
   app.register(listServiceOrderRoutes);
   //app.register(serviceOrderByIdRoutes);
   app.register(uploadServiceOrderPhotoRoutes);
}
