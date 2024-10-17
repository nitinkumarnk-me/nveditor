import { X } from "lucide-react";
import { FC, FormEvent, useState } from "react";

export interface ImageModelProps {
    onInsertImage: (imageUrl: string) => void;
    onClose: () => void;
}

export const ImageModel: FC<ImageModelProps> = ({ onInsertImage, onClose }) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleInsert = (e: FormEvent) => {
        e.preventDefault();

        if (imageUrl) {
            onInsertImage(imageUrl);
        }
        onClose();
    };

    return (
        <div className="image-modal">
            <div id="cancelBox">
                <X id="cancelBtn" onClick={onClose} width={20} hanging={20} />
            </div>
            <form onSubmit={handleInsert}>
                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <button type="submit">Insert</button>
            </form>
        </div>
    );
};