import { X } from "lucide-react";
import { FC, FormEvent, useState } from "react";

export interface ImageModelProps {
    onInsertImage: (imageUrl: string) => void;
    onClose: () => void;
}

async function checkIfImage(url: string) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(response);
        if (!response.ok) return false;
        const contentType = response.headers.get('content-type');
        return contentType && contentType.startsWith('image/');
    } catch (error) {
        return false;
    }
}

export const ImageModel: FC<ImageModelProps> = ({ onInsertImage, onClose }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleInsert = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (imageUrl) {
            if (await checkIfImage(imageUrl) === true) {
                setError(false)
                onInsertImage(imageUrl);
                onClose();
            } else {
                setError(true)
                console.log("Invalid Image URL")
            }
        }
        setLoading(false)
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
                <button type="submit" disabled={loading}>{loading ? "Checking..." : "Insert"}</button>

                {error && (
                    <span id="invalidImage">Invalid Image URL</span>
                )}
            </form>
        </div>
    );
};