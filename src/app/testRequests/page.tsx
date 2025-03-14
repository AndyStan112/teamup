"use client";

import { useState } from "react";
import { addUser } from "./actions";

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        profileImage: null,
        age: "",
        gender: "MALE",
        githubLink: "",
        country: "",
        city: "",
        languages: "",
        technologies: "",
        description: "",
        codingTimePreference: [],
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            // For file input, set the file object
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            // For other inputs, update the state normally
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckboxChange = (value) => {
        setFormData((prev) => {
            const updatedPreferences = prev.codingTimePreference.includes(value)
                ? prev.codingTimePreference.filter((item) => item !== value)
                : [...prev.codingTimePreference, value];
            return { ...prev, codingTimePreference: updatedPreferences };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await addUser(formData);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    name="profileImage"
                    type="file"
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                    placeholder="Age"
                    className="w-full p-2 border rounded mb-2"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                    <option value="DONOTWANTTOSAY">Prefer not to say</option>
                </select>

                <input
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="GitHub Link"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2 border rounded mb-2"
                />

                <input
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="Languages (comma-separated)"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="Technologies (comma-separated)"
                    className="w-full p-2 border rounded mb-2"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded mb-2"
                />

                <div className="mb-2">
                    <p className="font-bold mb-1">Coding Time Preference</p>
                    {[
                        "MORNING",
                        "AFTERNOON",
                        "EVENING",
                        "NIGHT",
                        "ANYTIME",
                    ].map((time) => (
                        <label key={time} className="block">
                            <input
                                type="checkbox"
                                value={time}
                                checked={formData.codingTimePreference.includes(
                                    time
                                )}
                                onChange={() => handleCheckboxChange(time)}
                                className="mr-2"
                            />
                            {time}
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
