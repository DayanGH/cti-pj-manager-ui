import { axiosInstance } from "./axios";

export async function createToken(data) {
  try {
    const response = await axiosInstance.post("/login/", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function refreshToken(refresh) {
  try {
    const response = await axiosInstance.post("/login/refresh/", {
      refresh,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function verifyToken(token) {
  try {
    const response = await axiosInstance.post("/login/verify/", {
      token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export const addProject = async (data) => {
  const response = await axiosInstance.post("projects/", data);
  return response.data;
};
export const editProject = async (data) => {
  const response = await axiosInstance.patch(`projects/${data.id}/`, data);
  return response.data;
};

export const fetchProjects = async (classification) => {
  const response = await axiosInstance.get("/projects/", {
    headers: {
      "classification": `${classification}`
    }
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`projects/${id}/`);
  return response.data;
};

export const fetchDocuments = async () => {
  const response = await axiosInstance.get("/documents/");
  return response.data;
};

export const addPDocument = async (data, route) => {
  const response = await axiosInstance.post(route, data, { headers: { "Content-Type": "multipart/form-data", }, });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await axiosInstance.delete(`projectdocuments/${id}/`);
  return response.data;
};

export const fetchPrograms = async () => {
  const response = await axiosInstance.get("/programs/");
  return response.data;
};
export const fetchChiefs = async () => {
  const response = await axiosInstance.get("/users/");
  return response.data;
};
export const fetchProjectsDetails = async (p_id) => {
  const response = await axiosInstance.get(`/projects/${p_id}`);
  return response.data;
};
export const fetchProgramDetails = async (p_id) => {
  const response = await axiosInstance.get(`/programs/${p_id}`);
  return response.data;
};
export const fetchChiefDetails = async (p_id) => {
  const response = await axiosInstance.get(`/user/${p_id}`);
  return response.data;
};
export const fetchGroupDocuments = async (name, project) => {
  const response = await axiosInstance.get('/documentgroups/', {
    headers: {
      "name": `${name}`,
      "project": `${project}`
    }
  });
  return response.data;
}
export const addGroupDocuments = async (data) => {
  const response = await axiosInstance.post('/documentgroups/', data);
  return response.data;
}
export const fetchMembers = async () => {
  const response = await axiosInstance.get("/members/");
  return response.data;
};
