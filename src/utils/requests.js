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
export const fetchPrograms = async (classification) => {
  const response = await axiosInstance.get("/programs/", {
    headers: {
      "program-classification": `${classification}`
    }
  });
  return response.data;
};

export const fetchProgramDetails = async (p_id) => {
  const response = await axiosInstance.get(`/programs/${p_id}`);
  return response.data;
};

export const deleteProgram = async (id) => {
  const response = await axiosInstance.delete(`programs/${id}/`);
  return response.data;
};
export const addProgram = async (data) => {
  const response = await axiosInstance.post('programs/', data);
  return response.data;
};
export const editProgram = async (data) => {
  const response = await axiosInstance.patch(`programs/${data.id}/`, data);
  return response.data;
};

//Documents
export const fetchSimpleDocuments = async () => {
  const response = await axiosInstance.get("/documents/");
  return response.data;
};
export const deleteSimpleDocuments = async (id) => {
  const response = await axiosInstance.delete(`/documents/${id}/`);
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
export const deleteProgramDocument = async (id) => {
  const response = await axiosInstance.delete(`programdocuments/${id}/`);
  return response.data;
};

export const downloadDocument = async (path, filename) => {
  const response = await axiosInstance.get(`${path}/download`, { responseType: 'blob' })
    .then((response) => {
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
export const fetchDocumentsGroup = async (name, p, path) => {
  const response = await axiosInstance.get(path, {
    headers: {
      "name": `${name}`,
      "project": `${p}`
    }
  });
  return response.data;
}

export const addDocumentsGroup = async (data, path) => {
  const response = await axiosInstance.post(path, data);
  return response.data;
}

//Group Documents
export const deleteGroupDocuments = async (id) => {
  const response = await axiosInstance.delete(`/groupdocuments/${id}/`);
  return response.data;
}
export const deleteProgramGroupDocuments = async (id) => {
  const response = await axiosInstance.delete(`/programgroupdocuments/${id}/`);
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
export const editMember = async (data) => {
  const response = await axiosInstance.patch(`members/${data.id}/`, data);
  return response.data;
};
export const deleteMember = async (id) => {
  const response = await axiosInstance.delete(`members/${id}/`);
  return response.data;
};

//Users
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
  const response = await axiosInstance.delete(`delete_user/${id}/`);
  return response.data;
};
export const editUser = async (data) => {
  const response = await axiosInstance.patch(`update_user/${data.id}/`, data);
  return response.data;
};
export const editPassword = async (id, data) => {
  const response = await axiosInstance.patch(`change_password/${id}/`, data);
  return response.data;
};
export const sendMail = async (dest) => {
  const link = document.createElement('a');
  link.href = 'mailto:' + dest;
  document.body.appendChild(link);
  link.click();
};
