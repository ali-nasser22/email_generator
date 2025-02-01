import  { useState } from 'react';
import { Copy, Send } from 'lucide-react';
import axios from "axios";

const App = () => {
    const [emailContent, setEmailContent] = useState('');
    const [tone, setTone] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try{
            const response = await axios.post("http://localhost:8080/api/email/generate",
                {
                    emailContent,
                    tone
                });
            setGeneratedReply(typeof  response.data === 'string' ? response.data : JSON.stringify(response));

        }
        catch (error){
            setError("Failed to genrate email reply. Please try again later");
            console.error(error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Reply Generator</h1>
                        <p className="text-gray-600">Generate professional email responses with ease</p>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        {/* Original Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Original Email Content</label>
                            <textarea
                                value={emailContent || ''}
                                onChange={(e) => setEmailContent(e.target.value)}
                                className="w-full h-48 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Paste the original email here..."
                            />
                        </div>

                        {/* Tone Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Select Tone (Optional)</label>
                            <select
                                value={tone || ''}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a tone</option>
                                <option value="professional">Professional</option>
                                <option value="semi-professional">Semi-professional</option>
                                <option value="friendly">Friendly</option>
                                <option value="casual">Casual</option>
                            </select>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!emailContent || loading}
                            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Generate Reply
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Generated Reply */}
                    {generatedReply && (
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Generated Reply</h2>
                            <textarea
                                value={generatedReply || ''}
                                readOnly
                                className="w-full h-48 px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(generatedReply)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;