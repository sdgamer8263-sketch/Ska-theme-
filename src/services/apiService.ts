import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: '/api/client', // Default Pterodactyl client API base
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 10000,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Here you would typically inject the Bearer token
        // const token = localStorage.getItem('pterodactyl_token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // Handle global errors here
        let errorMessage = 'An unexpected error occurred';
        if (error.response) {
          errorMessage = (error.response.data as any)?.errors?.[0]?.detail || error.message;
        } else if (error.request) {
          errorMessage = 'No response received from server. Check your connection.';
        }
        
        console.error('[ApiService Error]', errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // --- Methods --- //

  // Plugin Installer
  public async installPlugin(serverId: string, pluginId: number): Promise<boolean> {
    try {
      // Mocked endpoint: return this.api.post(`/servers/${serverId}/plugins/install`, { pluginId });
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Bedrock Addon Installer
  public async installBedrockAddon(serverId: string, addonId: number): Promise<boolean> {
    try {
      // Mocked endpoint: return this.api.post(`/servers/${serverId}/addons/install`, { addonId });
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Server Splitter
  public async splitServer(serverId: string, config: any): Promise<boolean> {
    try {
      // Mocked endpoint: return this.api.post(`/servers/${serverId}/split`, config);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Version & Egg Management
  public async getAvailableEggs(): Promise<{ id: string; name: string; description: string; category: string }[]> {
    try {
      // Mocked endpoint: return this.api.get('/eggs');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 'paper', name: 'Paper / Vanilla (Java)', description: 'High performance Minecraft server', category: 'Minecraft' },
        { id: 'bedrock', name: 'Bedrock Dedicated Server', description: 'Official Bedrock server', category: 'Minecraft' },
        { id: 'forge', name: 'Forge Modpack', description: 'Modded Minecraft server', category: 'Minecraft' },
        { id: 'nodejs', name: 'Node.js App / Discord Bot', description: 'JavaScript runtime environment', category: 'Bots & Apps' },
        { id: 'python', name: 'Python App / Discord Bot', description: 'Python environment', category: 'Bots & Apps' },
        { id: 'redis', name: 'Redis Server', description: 'In-memory data structure store', category: 'Databases' }
      ];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeServerVersion(serverId: string, type: string, version: string): Promise<boolean> {
    try {
      // Mocked endpoint: return this.api.post(`/servers/${serverId}/version`, { type, version });
      await new Promise(resolve => setTimeout(resolve, 2500));
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async changeServerEgg(serverId: string, eggId: string): Promise<boolean> {
    try {
      // Mocked endpoint: return this.api.post(`/servers/${serverId}/egg`, { eggId });
      await new Promise(resolve => setTimeout(resolve, 3000));
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Generic requests
  public async get<T>(url: string): Promise<T> {
    const response = await this.api.get<T>(url);
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post<T>(url, data);
    return response.data;
  }
  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url);
    return response.data;
  }
}

export const apiService = ApiService.getInstance();
