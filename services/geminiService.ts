
import { GoogleGenAI, Modality } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('FileReader did not return a string.'));
      }
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
};

export const removeBackground = async (imageFile: File): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set. Please configure it to use this service.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const base64ImageData = await fileToBase64(imageFile);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData,
                        mimeType: imageFile.type,
                    },
                },
                {
                    text: 'Remove the background from this image. Make the background transparent. Provide only the resulting image with the transparent background, no text.',
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                // PNG is best for transparency
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
    }
    
    // Fallback error if no image part is found
    const textResponse = response.text?.trim();
    if (textResponse) {
        throw new Error(`API returned a text response instead of an image: "${textResponse}"`);
    }

    throw new Error("No image was returned from the API. The model may have been unable to process this image.");
};
