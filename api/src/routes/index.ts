import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { checklistRoutes } from "@/routes/checklist";
import { CreateServiceOrderRoutes, listServiceOrderRoutes, serviceOrderByIdRoutes } from "./service-orders";
import { uploadServiceOrderPhotoRoutes } from "./photo-os";


export  function registerRoutes(app: FastifyInstance) {
   app.register(authRoutes)
   app.register(checklistRoutes);
   app.register(CreateServiceOrderRoutes);
   app.register(listServiceOrderRoutes);
   //app.register(serviceOrderByIdRoutes);
   app.register(uploadServiceOrderPhotoRoutes);
}
