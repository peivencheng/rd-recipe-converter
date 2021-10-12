import service from "./index";
export const apiGetRdProbe = () => service.get("/iwin/conv/rdProbe");
export const apiSubmitJob = (input) => service.post("/iwin/conv/submit", input);
