interface User {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  ageBracket?: string;
  salaryBracket?: string;
  customSalary?: number;
  education?: string;
  educationYear?: string;
  major?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const userForm = document.getElementById(
  "userForm"
) as HTMLFormElement;

const userIdInput = document.getElementById(
  "userId"
) as HTMLInputElement;

const firstNameInput = document.getElementById(
  "firstName"
) as HTMLInputElement;

const lastNameInput = document.getElementById(
  "lastName"
) as HTMLInputElement;

const genderSelect = document.getElementById(
  "gender"
) as HTMLSelectElement;

const ageBracketSelect = document.getElementById(
  "ageBracket"
) as HTMLSelectElement;

const salaryBracketSelect = document.getElementById(
  "salaryBracket"
) as HTMLSelectElement;

const customSalaryInput = document.getElementById(
  "customSalary"
) as HTMLInputElement;

const educationSelect = document.getElementById(
  "education"
) as HTMLSelectElement;

const schoolYearSelect = document.getElementById(
  "schoolYear"
) as HTMLSelectElement;

const universityYearSelect = document.getElementById(
  "universityYear"
) as HTMLSelectElement;

const majorInput = document.getElementById(
  "major"
) as HTMLInputElement;

const imageInput = document.getElementById(
  "image"
) as HTMLInputElement;

const maleSection = document.getElementById(
  "maleSection"
) as HTMLDivElement;

const adultSection = document.getElementById(
  "adultSection"
) as HTMLDivElement;

const customSalarySection = document.getElementById(
  "customSalarySection"
) as HTMLDivElement;

const minorSection = document.getElementById(
  "minorSection"
) as HTMLDivElement;

const schoolSection = document.getElementById(
  "schoolSection"
) as HTMLDivElement;

const universitySection = document.getElementById(
  "universitySection"
) as HTMLDivElement;

const tableBody = document.getElementById(
  "usersTableBody"
) as HTMLTableSectionElement;

const message = document.getElementById(
  "message"
) as HTMLParagraphElement;

const submitButton = document.getElementById(
  "submitButton"
) as HTMLButtonElement;

const cancelButton = document.getElementById(
  "cancelButton"
) as HTMLButtonElement;

const formTitle = document.getElementById(
  "formTitle"
) as HTMLHeadingElement;

const resetConditionalFields = (): void => {
  adultSection.classList.add("hidden");
  customSalarySection.classList.add("hidden");
  minorSection.classList.add("hidden");
  schoolSection.classList.add("hidden");
  universitySection.classList.add("hidden");

  salaryBracketSelect.value = "";
  customSalaryInput.value = "";

  educationSelect.value = "";
  schoolYearSelect.value = "";
  universityYearSelect.value = "";
  majorInput.value = "";
};

const handleGenderChange = (): void => {
  resetConditionalFields();

  if (genderSelect.value === "male") {
    maleSection.classList.remove("hidden");
  } else {
    maleSection.classList.add("hidden");
    ageBracketSelect.value = "";
  }
};

const handleAgeChange = (): void => {
  adultSection.classList.add("hidden");
  minorSection.classList.add("hidden");

  if (ageBracketSelect.value === "1-17") {
    minorSection.classList.remove("hidden");
  }

  if (
    ageBracketSelect.value === "18-29" ||
    ageBracketSelect.value === "30-49" ||
    ageBracketSelect.value === "50-69" ||
    ageBracketSelect.value === "70-89"
  ) {
    adultSection.classList.remove("hidden");
  }
};

const handleSalaryChange = (): void => {
  if (salaryBracketSelect.value === "other") {
    customSalarySection.classList.remove("hidden");
  } else {
    customSalarySection.classList.add("hidden");
    customSalaryInput.value = "";
  }
};

const handleEducationChange = (): void => {
  schoolSection.classList.add("hidden");
  universitySection.classList.add("hidden");

  schoolYearSelect.value = "";
  universityYearSelect.value = "";
  majorInput.value = "";

  if (educationSelect.value === "school") {
    schoolSection.classList.remove("hidden");
  }

  if (educationSelect.value === "university") {
    universitySection.classList.remove("hidden");
  }
};

const showMessage = (
  text: string,
  isError = false
): void => {
  message.textContent = text;

  message.style.color = isError
    ? "red"
    : "green";
};

const loadUsers = async (): Promise<void> => {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const users: User[] = await response.json();

    renderUsers(users);
  } catch (error) {
    console.error(error);

    showMessage(
      "Failed to load users.",
      true
    );
  }
};

const renderUsers = (users: User[]): void => {
  tableBody.innerHTML = "";

  if (users.length === 0) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td colspan="9">
        No users found.
      </td>
    `;

    tableBody.appendChild(row);

    return;
  }

  users.forEach((user) => {
    const row = document.createElement("tr");

    const imageCell = user.image
      ? `<img
          src="${user.image}"
          class="user-image"
          alt="User image"
        />`
      : `<span class="no-image">None</span>`;

    const salary = user.salaryBracket
      ? user.salaryBracket === "other"
        ? `$${user.customSalary ?? ""}`
        : `$${user.salaryBracket}`
      : "-";

    row.innerHTML = `
      <td>${imageCell}</td>

      <td>${escapeHtml(user.firstName)}</td>

      <td>${escapeHtml(user.lastName)}</td>

      <td>${escapeHtml(user.gender)}</td>

      <td>${user.ageBracket ?? "-"}</td>

      <td>${salary}</td>

      <td>${user.education ?? "-"}</td>

      <td>${user.major ?? "-"}</td>

      <td>
        <button
          class="edit-button"
          data-id="${user._id}"
        >
          Edit
        </button>

        <button
          class="delete-button"
          data-id="${user._id}"
        >
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  document
    .querySelectorAll<HTMLButtonElement>(".edit-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        editUser(button.dataset.id as string);
      });
    });

  document
    .querySelectorAll<HTMLButtonElement>(".delete-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        deleteUser(button.dataset.id as string);
      });
    });
};

const escapeHtml = (value: string): string => {
  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;
};

const editUser = async (
  id: string
): Promise<void> => {
  try {
    const response = await fetch(
      `/api/users/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve user");
    }

    const user: User = await response.json();

    userIdInput.value = user._id;

    firstNameInput.value = user.firstName;

    lastNameInput.value = user.lastName;

    genderSelect.value = user.gender;

    if (user.gender === "male") {
      maleSection.classList.remove("hidden");

      ageBracketSelect.value =
        user.ageBracket ?? "";

      handleAgeChange();

      salaryBracketSelect.value =
        user.salaryBracket ?? "";

      handleSalaryChange();

      if (user.customSalary !== undefined) {
        customSalaryInput.value =
          String(user.customSalary);
      }

      if (user.ageBracket === "1-17") {
        educationSelect.value =
          user.education ?? "";

        handleEducationChange();

        if (user.education === "school") {
          schoolYearSelect.value =
            user.educationYear ?? "";
        }

        if (user.education === "university") {
          universityYearSelect.value =
            user.educationYear ?? "";

          majorInput.value =
            user.major ?? "";
        }
      }
    }

    formTitle.textContent = "Edit User";

    submitButton.textContent = "Update User";

    cancelButton.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  } catch (error) {
    console.error(error);

    showMessage(
      "Failed to load user.",
      true
    );
  }
};

const deleteUser = async (
  id: string
): Promise<void> => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `/api/users/${id}`,
      {
        method: "DELETE"
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to delete user"
      );
    }

    showMessage(
      "User deleted successfully."
    );

    await loadUsers();
  } catch (error) {
    console.error(error);

    showMessage(
      "Failed to delete user.",
      true
    );
  }
};

const resetForm = (): void => {
  userForm.reset();

  userIdInput.value = "";

  maleSection.classList.add("hidden");
  adultSection.classList.add("hidden");
  customSalarySection.classList.add("hidden");
  minorSection.classList.add("hidden");
  schoolSection.classList.add("hidden");
  universitySection.classList.add("hidden");

  formTitle.textContent = "Add User";

  submitButton.textContent = "Add User";

  cancelButton.classList.add("hidden");

  message.textContent = "";
};

userForm.addEventListener(
  "submit",
  async (event: SubmitEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "firstName",
        firstNameInput.value.trim()
      );

      formData.append(
        "lastName",
        lastNameInput.value.trim()
      );

      formData.append(
        "gender",
        genderSelect.value
      );

      if (genderSelect.value === "male") {
        formData.append(
          "ageBracket",
          ageBracketSelect.value
        );

        if (
          ageBracketSelect.value !== "1-17"
        ) {
          formData.append(
            "salaryBracket",
            salaryBracketSelect.value
          );

          if (
            salaryBracketSelect.value ===
              "other"
          ) {
            formData.append(
              "customSalary",
              customSalaryInput.value
            );
          }
        }

        if (
          ageBracketSelect.value === "1-17"
        ) {
          formData.append(
            "education",
            educationSelect.value
          );

          if (
            educationSelect.value === "school"
          ) {
            formData.append(
              "educationYear",
              schoolYearSelect.value
            );
          }

          if (
            educationSelect.value ===
            "university"
          ) {
            formData.append(
              "educationYear",
              universityYearSelect.value
            );

            formData.append(
              "major",
              majorInput.value.trim()
            );
          }
        }
      }

      if (imageInput.files?.[0]) {
        formData.append(
          "image",
          imageInput.files[0]
        );
      }

      const id = userIdInput.value;

      const url = id
        ? `/api/users/${id}`
        : "/api/users";

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save user"
        );
      }

      showMessage(
        id
          ? "User updated successfully."
          : "User added successfully."
      );

      resetForm();

      await loadUsers();
    } catch (error) {
      console.error(error);

      showMessage(
        error instanceof Error
          ? error.message
          : "Failed to save user.",
        true
      );
    }
  }
);

genderSelect.addEventListener(
  "change",
  handleGenderChange
);

ageBracketSelect.addEventListener(
  "change",
  handleAgeChange
);

salaryBracketSelect.addEventListener(
  "change",
  handleSalaryChange
);

educationSelect.addEventListener(
  "change",
  handleEducationChange
);

cancelButton.addEventListener(
  "click",
  resetForm
);

loadUsers();