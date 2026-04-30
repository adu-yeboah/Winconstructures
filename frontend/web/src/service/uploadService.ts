import apiClient from './apiClient';

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

class UploadService {
  private baseUrl = '/api/upload';

  /**
   * Upload a single image to Cloudinary
   */
  async uploadImage(file: File): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<UploadResult>(`${this.baseUrl}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  /**
   * Upload multiple images to Cloudinary
   */
  async uploadImages(files: File[]): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  /**
   * Delete an image from Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/image/${publicId}`);
  }
}

export default new UploadService();
