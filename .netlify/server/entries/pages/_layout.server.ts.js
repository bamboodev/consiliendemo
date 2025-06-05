import { c as createClient } from "../../chunks/prismicio.js";
const load = async () => {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  return {
    navigation
  };
};
export {
  load
};
