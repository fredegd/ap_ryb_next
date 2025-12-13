"use server";

import { getAllServices } from "./services";

export async function getServicesClient() {
  return getAllServices();
}
