"use server";

import axios from "axios";

export async function fetchUsers() {
  const response = await axios.get(
    'https://world.openfoodfacts.org/api/v2/search?code=5060335635808,"3286790020238",3242272260059&fields=code,product_name,image_url,nutriments.energy'
  );
  return response.data;
}
