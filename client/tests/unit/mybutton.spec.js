import { render, fireEvent } from "@testing-library/vue";
import { expect } from "@jest/globals"; // Добавьте эту строку
import "@testing-library/jest-dom"; // Добавьте эту строку
import MyButton from "@/components/UI/MyButton.vue";

describe("MyButton", () => {
  it("renders button text correctly", () => {
    const buttonText = "Click me";
    const { getByText } = render(MyButton, {
      slots: {
        default: buttonText,
      },
    });

    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it("applies 'btn' class to the button element", () => {
    const { getByRole } = render(MyButton);

    const button = getByRole("button");
    expect(button).toHaveClass("btn");
  });

  it("triggers click event when button is clicked", async () => {
    const { getByRole, emitted } = render(MyButton);

    const button = getByRole("button");
    await fireEvent.click(button);

    expect(emitted().click).toHaveLength(1);
  });
});

//     renders button text correctly - проверяет, что текст кнопки отображается правильно.
//         Мы создаем компонент MyButton с помощью функции render из @testing-library/vue.
//         Мы передаем текст "Click me" в слот по умолчанию компонента с помощью опции slots.
//         Затем мы ищем элемент кнопки с помощью getByText и передаем ожидаемый текст "Click me".
//         В конце мы проверяем, что найденный элемент кнопки совпадает с ожидаемым текстом кнопки.

//     applies 'btn' class to the button element - проверяет, что класс "btn" применяется к элементу кнопки.
//         Мы также создаем компонент MyButton с помощью функции render.
//         Затем мы ищем кнопку с помощью getByRole и передаем аргумент "button", так как мы ожидаем кнопку.
//         Далее мы проверяем, что найденная кнопка содержит класс "btn" с помощью toHaveClass.

//     triggers click event when button is clicked - проверяет, что событие "click" срабатывает при клике на кнопку.
//         Здесь мы создаем компонент MyButton с помощью render.
//         Мы снова ищем кнопку с помощью getByRole.
//         Затем мы вызываем fireEvent.click для имитации клика на кнопке.
//         Наконец, мы проверяем, что событие "click" было вызвано один раз с помощью emitted().click.
