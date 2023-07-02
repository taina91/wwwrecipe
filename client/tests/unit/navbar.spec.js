import { render, fireEvent, screen } from "@testing-library/vue";
import { expect } from "@jest/globals"; // Добавьте эту строку
import "@testing-library/jest-dom"; // Добавьте эту строку
import NavBar from "@/components/UI/NavBar.vue";

jest.mock("@/components/UI/MyButton.vue", () => ({
  name: "MyButton",
  template: "<button></button>",
}));

describe("NavBar", () => {
  it("Отображает кнопку 'Войти' при отсутствии аутентификации", async () => {
    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: false,
            },
          },
        },
      },
    });

    const loginButton = screen.getByText("Войти");
    expect(loginButton).toBeInTheDocument();
  });
  it("Отображает меню для аутентифицированного пользователя", async () => {
    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: false, // Можно настроить различные сценарии для администратора
              },
            },
            dispatch: jest.fn(),
          },
        },
      },
    });

    const recipesLink = screen.getByText("Рецепты");
    const fridgeLink = screen.getByText("Холодильник");
    const favoritesLink = screen.getByText("Избранное");
    const profileImage = screen.getByAltText("Profile Image");

    expect(recipesLink).toBeInTheDocument();
    expect(fridgeLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });
  it("Вызывает метод logout при клике на кнопку 'Выйти'", async () => {
    const logoutMock = jest.fn();

    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: false,
              },
            },
            dispatch: logoutMock,
          },
        },
      },
    });

    const logoutLink = screen.getByText("Выйти");
    fireEvent.click(logoutLink);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it("Перенаправляет пользователя на страницу 'Рецепты' при клике на ссылку 'Рецепты'", async () => {
    const pushMock = jest.fn();

    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: pushMock,
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: false,
              },
            },
            dispatch: jest.fn(),
          },
        },
      },
    });

    const recipesLink = screen.getByText("Рецепты");
    fireEvent.click(recipesLink);

    expect(pushMock).toHaveBeenCalledWith("/recipes");
  });

  it("Отображает меню для аутентифицированного администратора", async () => {
    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: true,
              },
            },
            dispatch: jest.fn(),
          },
        },
      },
    });

    const adminLink = screen.getByText("Админка");
    expect(adminLink).toBeInTheDocument();
  });

  it("Перенаправляет пользователя на страницу регистрации при клике на кнопку 'Войти'", async () => {
    const pushMock = jest.fn();

    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: pushMock,
          },
          $store: {
            state: {
              isLoggedIn: false,
            },
          },
        },
      },
    });

    const loginButton = screen.getByText("Войти");
    fireEvent.click(loginButton);

    expect(pushMock).toHaveBeenCalledWith("/register");
  });

  it("Скрывает элементы меню для аутентифицированного пользователя", async () => {
    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: false,
            },
          },
        },
      },
    });

    const fridgeLink = screen.queryByText("Холодильник");
    const favoritesLink = screen.queryByText("Избранное");

    expect(fridgeLink).toBeNull();
    expect(favoritesLink).toBeNull();
  });

  it("Отображает логотип и перенаправляет при клике", async () => {
    const pushMock = jest.fn();

    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: pushMock,
          },
          $store: {
            state: {
              isLoggedIn: false,
            },
          },
        },
      },
    });

    const logo = screen.getByAltText("");
    fireEvent.click(logo);

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("Отображает профильное изображение и открывает выпадающее меню", async () => {
    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: false,
              },
            },
            dispatch: jest.fn(),
          },
        },
      },
    });

    const profileImage = screen.getByAltText("Profile Image");
    fireEvent.click(profileImage);

    const myRecipesLink = screen.getByText("Мои рецепты");
    const adminLink = screen.queryByText("Админка");

    expect(myRecipesLink).toBeInTheDocument();
    expect(adminLink).toBeNull();
  });

  it("Вызывает метод unsetUser при выходе из аккаунта", async () => {
    const unsetUserMock = jest.fn();

    render(NavBar, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            state: {
              isLoggedIn: true,
              user: {
                admin: false,
              },
            },
            dispatch: unsetUserMock,
          },
        },
      },
    });

    const logoutLink = screen.getByText("Выйти");
    fireEvent.click(logoutLink);

    expect(unsetUserMock).toHaveBeenCalledTimes(1);
  });
});
