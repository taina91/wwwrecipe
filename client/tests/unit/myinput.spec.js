import { render, fireEvent } from "@testing-library/vue";
import { expect } from "@jest/globals"; // Добавьте эту строку
import "@testing-library/jest-dom"; // Добавьте эту строку
import MyInput from "@/components/UI/MyInput.vue";

describe("MyInput", () => {
  it("updates the modelValue when input is changed", async () => {
    const { getByRole, emitted } = render(MyInput, {
      props: {
        modelValue: "",
      },
    });

    const input = getByRole("textbox");
    await fireEvent.update(input, "Test Value");

    expect(emitted()["update:modelValue"][0][0]).toBe("Test Value");
  });

  it("renders the input with the correct type", () => {
    const { getByRole } = render(MyInput, {
      props: {
        type: "email",
        modelValue: "",
      },
    });

    const input = getByRole("textbox");

    expect(input.type).toBe("email");
  });
});

// В первом тесте мы проверяем, что при изменении значения ввода (input), компонент
// MyInput правильно генерирует событие "update:modelValue" с обновленным значением.

// Во втором тесте мы проверяем, что компонент корректно отображает ввод с заданным типом.
