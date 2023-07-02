import { render, fireEvent, screen } from "@testing-library/vue";
import { expect } from "@jest/globals"; // Добавьте эту строку
import "@testing-library/jest-dom"; // Добавьте эту строку
import MyMultiselect from "@/components/UI/MyMultiselect.vue";

describe("MyMultiselect", () => {
  it("отображает входные параметры", () => {
    const options = [
      { id: 1, title: "Option 1" },
      { id: 2, title: "Option 2" },
      { id: 3, title: "Option 3" },
    ];
    const modelValue = [1, 3];
    const { getAllByText } = render(MyMultiselect, {
      props: { options, modelValue },
    });

    options.forEach((option) => {
      const optionElement = getAllByText(option.title);
      expect(optionElement[1]).toBeInTheDocument();
    });
  });

  it("должен добавлять элемент в выбранные при клике на опцию", async () => {
    const options = [
      { id: 1, title: "Option 1" },
      { id: 2, title: "Option 2" },
      { id: 3, title: "Option 3" },
    ];
    const modelValue = [];
    const { getAllByText, emitted } = render(MyMultiselect, {
      props: { options, modelValue },
    });

    const optionElements = getAllByText("Option 2");
    await fireEvent.click(optionElements[1]);

    expect(emitted()["update:modelValue"][0][0]).toEqual([2]);
  });

  it("фильтрует опции при вводе значения в поле ввода", async () => {
    const options = [
      { id: 1, title: "Option 1" },
      { id: 2, title: "Option 2" },
      { id: 3, title: "Option 3" },
    ];
    const modelValue = [];
    const { getByLabelText, getAllByText } = render(MyMultiselect, {
      props: { options, modelValue },
    });

    const inputElement = getByLabelText("Select more");
    await fireEvent.update(inputElement, "option 2");

    const filteredOption = getAllByText("Option 2");
    expect(filteredOption[1]).toBeInTheDocument();
  });

  it("должен удалять элемент из выбранных при клике на кнопку удаления", async () => {
    const options = [{ id: 1, title: "Option 1" }];
    const modelValue = [1];

    const { getByText, emitted } = render(MyMultiselect, {
      props: { options, modelValue },
    });

    const removeButton = getByText("×");
    await fireEvent.click(removeButton);

    expect(emitted()["update:modelValue"][0][0]).toEqual([]);
  });

  it("должен правильно отображать выбранные элементы", async () => {
    const options = [
      { id: 1, title: "Option 1" },
      { id: 2, title: "Option 2" },
      { id: 3, title: "Option 3" },
    ];
    const modelValue = [1, 2];

    render(MyMultiselect, {
      props: {
        options,
        modelValue,
      },
    });

    const selectedOptions = screen.getAllByText(/Option \d/);
    expect(selectedOptions[0].textContent).toContain("Option 1");
    expect(selectedOptions[1].textContent).toContain("Option 2");
  });
});
