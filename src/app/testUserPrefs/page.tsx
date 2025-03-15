"use client";
import React, { useState } from "react";
import { createOrUpdateUserPrefs } from "./actions";
import { CodingTimePreference } from "@prisma/client";

const PreferencesForm = () => {
    const [formData, setFormData] = useState({
        preferredGender: "",
        codingTimePreference: "",
        spokenLanguages: [],
        technologies: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // For checkboxes, update the array of selected values
            setFormData((prevState) => {
                const updatedValues = checked
                    ? [...prevState[name], value] // Add value if checked
                    : prevState[name].filter((item) => item !== value); // Remove value if unchecked

                return { ...prevState, [name]: updatedValues };
            });
        } else {
            // Handle other input types (like select or text input)
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => formDataObject.append(key, item));
            } else {
                formDataObject.append(key, value);
            }
        });
        createOrUpdateUserPrefs(formDataObject);
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Preferred Gender</label>
                <select
                    name="preferredGender"
                    value={formData.preferredGender}
                    onChange={handleChange}
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                    <option value="DONOTWANTTOSAY">Prefer not to say</option>
                </select>
            </div>

            <div>
                <label>Coding Time Preference</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="codingTimePreference"
                            value={CodingTimePreference.MORNING}
                            checked={formData.codingTimePreference.includes("MORNING")}
                            onChange={handleChange}
                        />
                        Morning
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="codingTimePreference"
                            value={CodingTimePreference.AFTERNOON}
                            checked={formData.codingTimePreference.includes("AFTERNOON")}
                            onChange={handleChange}
                        />
                        Afternoon
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="codingTimePreference"
                            value={CodingTimePreference.EVENING}
                            checked={formData.codingTimePreference.includes("EVENING")}
                            onChange={handleChange}
                        />
                        Evening
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="codingTimePreference"
                            value={CodingTimePreference.NIGHT}
                            checked={formData.codingTimePreference.includes("NIGHT")}
                            onChange={handleChange}
                        />
                        Night
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="codingTimePreference"
                            value={CodingTimePreference.ANYTIME}
                            checked={formData.codingTimePreference.includes("ANYTIME")}
                            onChange={handleChange}
                        />
                        Anytime
                    </label>
                </div>
            </div>

            <div>
                <label>Spoken Languages</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="spokenLanguages"
                            value="English"
                            checked={formData.spokenLanguages.includes("English")}
                            onChange={handleChange}
                        />
                        English
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="spokenLanguages"
                            value="Spanish"
                            checked={formData.spokenLanguages.includes("Spanish")}
                            onChange={handleChange}
                        />
                        Spanish
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="spokenLanguages"
                            value="French"
                            checked={formData.spokenLanguages.includes("French")}
                            onChange={handleChange}
                        />
                        French
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="spokenLanguages"
                            value="German"
                            checked={formData.spokenLanguages.includes("German")}
                            onChange={handleChange}
                        />
                        German
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="spokenLanguages"
                            value="Mandarin"
                            checked={formData.spokenLanguages.includes("Mandarin")}
                            onChange={handleChange}
                        />
                        Mandarin
                    </label>
                </div>
            </div>

            <div>
                <label>Technologies</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="C#"
                            checked={formData.technologies.includes("C#")}
                            onChange={handleChange}
                        />
                        C#
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="C++"
                            checked={formData.technologies.includes("C++")}
                            onChange={handleChange}
                        />
                        C++
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="JavaScript"
                            checked={formData.technologies.includes("JavaScript")}
                            onChange={handleChange}
                        />
                        JavaScript
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="Tailwind"
                            checked={formData.technologies.includes("Tailwind")}
                            onChange={handleChange}
                        />
                        Tailwind
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="React"
                            checked={formData.technologies.includes("React")}
                            onChange={handleChange}
                        />
                        React
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="technologies"
                            value="Python"
                            checked={formData.technologies.includes("Python")}
                            onChange={handleChange}
                        />
                        Python
                    </label>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default PreferencesForm;
