import axios from "axios";
import { toast } from "react-toastify";

// Configuration
//const BASE_URL = "http://172.228.136.120:80";
const BASE_URL = import.meta.env.VITE_API_URL;
// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const userObject = user ? JSON.parse(user) : null;
    const accessToken = userObject?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
   // const code = error?.response?.data?.code;
    if (status === 401 ) {
      // Clear user from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("components");
      window.location.href ="/";
    }

    return Promise.reject(error);
  }
);
// Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login/", credentials);
      return response.data;
    } catch (error) {
      console.error("error", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Get message from error.response.data
        throw new Error(error.response.data.message || "Invalid credentials");
      }

      // For other errors, use fallback message
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/register/", {
        email: userData.email,
        password: userData.password,
        password2: userData.password2,
        full_name: userData.full_name,
        role: userData.role, // Make sure we're sending roles array
      });
      return response.data;
    } catch (error) {
      // Extract error messages from response
      if (error.response?.data) {
        const errorData = error.response.data;
        // If the error data contains validation errors
        if (typeof errorData === "object") {
          const formattedErrors = {};
          Object.keys(errorData).forEach((key) => {
            formattedErrors[key] = Array.isArray(errorData[key])
              ? errorData[key]
              : [errorData[key]];
          });
          throw formattedErrors;
        }
      }
      // For other types of errors
      throw new Error("Registration failed. Please try again.");
    }
  },

  // No request body needed
  // Clears token on success
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axiosInstance.post("/auth/logout/", { refresh: refreshToken });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  requestPasswordReset: async (payload) => {
    try {
      const response = await axiosInstance.post("auth/forgot-password/", {
        ...payload,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Password reset request failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getUsersData: async () => {
    try {
      const res = await axiosInstance.get("auth/users/");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  },

  deleteUser: async (userId) => {
    try {
      const res = await axiosInstance.delete(`auth/users/${userId}/`);
      toast.success("Successfully deleted the user!");
      return res;
    } catch (err) {
      toast.error("Failed to delete a user!");
      console.error(err);
    }
  },

  updateUser: async (userId, payload) => {
    try {
      const res = await axiosInstance.put(`auth/users/${userId}/`, payload);
      toast.success("User edited successfully!");
      return res;
    } catch (err) {
      toast.error("Failed to update a user!");
      console.error(err);
    }
  },
    getRoles: async () => {
    try {
      const response = await axiosInstance.get("/auth/users/roles/");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch roles.";
      throw new Error(errorMessage);
    }
  },

};

// PCB Specifications API
export const pcbAPI = {
  getSpecification: async (id, designerOrverifier) => {
    const flag =
      designerOrverifier === "designer"
        ? {
            is_designer: 1,
          }
        : {
            is_verifier: 1,
          };
    try {
      const response = await axiosInstance.get(
        `/right-draw/pcb-specification/${id}/`,
        {
          params: flag,
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch PCB specifications.";
      throw new Error(errorMessage);
    }
  },

  getSectionGroupings: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/right-draw/section-groupings/${id}/`
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch section groupings.";
      throw new Error(errorMessage);
    }
  },

  getSubCategoriesTwo: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/right-draw/sub-categories-two/${id}/`
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch sub-categories.";
      throw new Error(errorMessage);
    }
  },
};

// Components API
export const componentsAPI = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get("/masters/components/");
      localStorage.setItem("components", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch components.";
      throw new Error(errorMessage);
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/masters/components/${id}/`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        `Failed to fetch component with id ${id}.`;
      throw new Error(errorMessage);
    }
  },
};
export const rulesAPI = {
  getDesignOptions: async (id) => {
    try {
      const response = await axiosInstance.get(
        `right-draw/design-options/${id}/`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch design Options";
      throw new Error(errorMessage);
    }
  },

  getRules: async (selectedOptions) => {
    try {
      const queryString = `design_option_ids=${selectedOptions.join(",")}`;
      const response = await axiosInstance.get(
        `right-draw/design-rules/?${queryString}`
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch design rules.";
      throw new Error(errorMessage);
    }
  },
};
// CAD Templates API
export const cadAPI = {
  getTemplates: async () => {
    try {
      const response = await axiosInstance.get(
        "/right-draw/cad-design-templates/"
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch CAD templates.";
      throw new Error(errorMessage);
    }
  },

  createTemplate: async (templateData) => {
    try {
      const response = await axiosInstance.post(
        "/right-draw/cad-design-templates/",
        templateData
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create CAD template.";
      throw new Error(errorMessage);
    }
  },
};

export const verifierAPI = {
  getVerifierFields: async (componentId, CategoryId, subcategoryId) => {
    try {
      const response = await axiosInstance.get("/right-draw/verifier-fields/", {
        params: {
          component_id: componentId,
          category_id: CategoryId,
          sub_category_id: subcategoryId,
        },
      });
  
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch CAD templates.";
      throw new Error(errorMessage);
    }
  },
  createVerifierTemplate: async (data) => {
    try {
      const response = await axiosInstance.post(
        "/right-draw/verifier-templates/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("error here", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.reduce((eachMessage, acc) => {
          `${acc}  ${eachMessage}`;
        }) ||
        error.response?.data ||
        "Failed to create template.";
      throw new Error(errorMessage);
    }
  },

  getVerifyResults: async (data) => {
    try {
      const response = await axiosInstance.post(
        "/right-draw/verify-results/",
        data
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to post verifier results.";
      throw new Error(errorMessage);
    }
  },
};

// Error Handler

export const approverAPI = {
  // Get approver template with query params
  getApproverTemplate: async (params) => {
    try {
      const response = await axiosInstance.get(
        `/right-draw/approver-template/`,
        {
          params: {
            oppNumber: params.oppNumber,
            opuNumber: params.opuNumber,
            eduNumber: params.eduNumber,
            modelName: params.modelName,
            partNumber: params.partNumber,
            revisionNumber: params.revisionNumber,
            component: params.component,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch approver template.";

      console.error({ errorMessage });
      throw new Error(errorMessage);
    }
  },

  // Submit approver decision with updated request body format
  submitApproverTemplate: async (templateData) => {
    try {
      const requestBody = {
        oppNumber: templateData.oppNumber,
        opuNumber: templateData.opuNumber,
        eduNumber: templateData.eduNumber,
        modelName: templateData.modelName,
        partNumber: templateData.partNumber,
        revisionNumber: templateData.revisionNumber,
        component: templateData.component,
        componentSpecifications: Object.fromEntries(
          Object.entries(templateData.componentSpecifications).map(
            ([key, value]) => [
              key,
              {
                selected_deviation_id: value.selected_deviation_id,
                status: value.status,
              },
            ]
          )
        ),
        approverQueryData: templateData.approverQueryData.map((item) => ({
          id: item.id,
          status: item.status,
        })),
        status: templateData.status,
        comments: templateData.comments,
      };

      const response = await axiosInstance.post(
        "/right-draw/approver-template/",
        requestBody
      );

      // Handle 400 errors specifically
      if (response.status === 400) {
        throw new Error(Object.values(response.data).flat().join(", "));
      }

      return response.data;
    } catch (error) {
      // If error response contains validation errors
      if (error.response?.data && typeof error.response.data === "object") {
        const errorMessages = Object.entries(error.response.data)
          .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
          .join("\n");
        throw new Error(errorMessages);
      }

      // Default error message
      const errorMessage =
        error.response?.data?.message || "Failed to submit approver template.";
      throw new Error(errorMessage);
    }
  },
};

export const templateAPI = {
  checkTemplateExists: async (params) => {
    try {
      const response = await axiosInstance.get("/right-draw/check-template/", {
        params: {
          oppNumber: params.oppNumber,
          opuNumber: params.opuNumber,
          eduNumber: params.eduNumber,
          modelName: params.modelName,
          partNumber: params.partNumber,
          revisionNumber: params.revisionNumber,
          component: params.component,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to check template existence.";
      throw new Error(errorMessage);
    }
  },
};

// Templates API
export const templatesAPI = {
  getUserTemplates: async () => {
    try {
      const response = await axiosInstance.get("/right-draw/user-templates/");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user templates.";
      throw new Error(errorMessage);
    }
  },
};
