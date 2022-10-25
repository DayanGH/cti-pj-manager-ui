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

//Projects
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

export const fetchProjectsDetails = async (p_id) => {
  const response = await axiosInstance.get(`/projects/${p_id}`);
  return response.data;
};

//Programs
export const fetchPrograms = async () => {
  const response = await axiosInstance.get("/programs/");
  return response.data;
};

export const fetchProgramDetails = async (p_id) => {
  const response = await axiosInstance.get(`/programs/${p_id}`);
  return response.data;
};

//Documents
export const fetchDocuments = async () => {
  const response = await axiosInstance.get("/documents/");
  return response.data;
};

export const addDocument = async (data, route) => {
  const response = await axiosInstance.post(route, data, { headers: { "Content-Type": "multipart/form-data", }, });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await axiosInstance.delete(`projectdocuments/${id}/`);
  return response.data;
};

export const downloadDocument = async (id, filename) => {
  const response = await axiosInstance.get(`documents/${id}/download`, { responseType: 'blob' })
  .then((response)=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    })
  //return response.data;
};

//Documents Group
export const fetchDocumentsGroup = async (name, project) => {
  const response = await axiosInstance.get('/documentgroups/', {
    headers: {
      "name": `${name}`,
      "project": `${project}`
    }
  });
  return response.data;
}

export const addDocumentsGroup = async (data) => {
  const response = await axiosInstance.post('/documentgroups/', data);
  return response.data;
}

//Group Documents
export const deleteGroupDocuments = async (id) => {
  const response = await axiosInstance.delete(`/groupdocuments/${id}/`);
  return response.data;
}

//Members
export const fetchMembers = async () => {
  const response = await axiosInstance.get("/members/");
  return response.data;
};
export const addMember = async (data) => {
  const response = await axiosInstance.post("members/", data);
  return response.data;
};
export const deleteMember = async (id) => {
  const response = await axiosInstance.delete(`members/${id}/`);
  return response.data;
};

//Users
//TODO: Decide wether to use "chief" or user
export const fetchChiefs = async () => {
  const response = await axiosInstance.get("/users/");
  return response.data;
};
export const fetchChiefDetails = async (p_id) => {
  const response = await axiosInstance.get(`/user/${p_id}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users/");
  return response.data;
};

export const addUser = async (data) => {
  const response = await axiosInstance.post("register/", data);
  return response.data;
};
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`users/${id}/`);
  return response.data;
};


