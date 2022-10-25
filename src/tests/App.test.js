import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import mockData from "./mock/mockData";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe(" Testando os inputs ", () => {
  test("Verifica se os filtros estão sendo renderizados", () => {
    render(<App />);

    const nameInput = screen.getByTestId("name-filter");
    const applyBtn = screen.getByTestId("button-filter");
    const deleteAllBtn = screen.getByTestId("button-remove-filters");
    const sortBtn = screen.getByTestId("column-sort-button");
    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");

    expect(nameInput).toBeInTheDocument();
    expect(applyBtn).toBeInTheDocument();
    expect(deleteAllBtn).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
    expect(columnSelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();

    userEvent.type(nameInput, "Yavin IV");
    userEvent.type(valueInput, "100");
    userEvent.type(columnSelect, "population");
    userEvent.type(comparisonSelect, "maior que");
    userEvent.click(applyBtn);
  });
  test("Verifica retorno do filtro por planeta", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const input = screen.getByTestId("name-filter");
    waitFor(() => {
      userEvent.type(input, "oo");
    });
    expect(await screen.findByText("Tatooine")).toBeInTheDocument();
  });

  test("Verifica filtro value menor que", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");

    waitFor(() => {userEvent.selectOptions(columnFilter, "diameter");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "menor que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "8900");});
    waitFor(() => {userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});
    
    expect(columnFilter).toHaveValue("diameter");
    expect(await screen.findByText("menor que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(8900);
    expect(await screen.findByText("Hoth")).toBeInTheDocument();
    expect(await screen.findByText("Endor")).toBeInTheDocument();

    waitFor(() => {userEvent.selectOptions(columnFilter, "population");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "menor que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "200000");});
    waitFor(() => { userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});

    expect(columnFilter).toHaveValue("population");
    expect(await screen.findByText("menor que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(200000);
    expect(await screen.findByText("Yavin IV")).toBeInTheDocument();

    waitFor(() => { userEvent.selectOptions(columnFilter, "orbital_period");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "menor que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "312");});
    waitFor(() => {userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});

    expect(columnFilter).toHaveValue("orbital_period");
    expect(await screen.findByText("menor que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(312);
  });

  test("Verifica filtro value maior que", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    waitFor(() => { userEvent.selectOptions(columnFilter, "population");});
    waitFor(() => { userEvent.selectOptions(comparisonFilter, "maior que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "10");});
    waitFor(() => { userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});

    expect(await screen.findByText("maior que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(10);
    expect(await screen.findByText("Tatooine")).toBeInTheDocument();

    waitFor(() => { userEvent.selectOptions(columnFilter, "orbital_period");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "maior que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "4818");});
    waitFor(() => {userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});

    expect(columnFilter).toHaveValue("orbital_period");
    expect(await screen.findByText("maior que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(4818);
    expect(await screen.findByText("Bespin")).toBeInTheDocument();

    waitFor(() => { userEvent.selectOptions(columnFilter, "surface_water");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "maior que");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "10");});
    waitFor(() => {userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});
    
    expect(columnFilter).toHaveValue("surface_water");
    expect(await screen.findByText("maior que")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(10);
  });

  test("Verifica filtro value igual a", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");

    waitFor(() => {userEvent.selectOptions(columnFilter, "surface_water");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "igual a");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "12"); });
    waitFor(() => { userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});

    expect(columnFilter).toHaveValue("surface_water");
    expect(await screen.findByText("igual a")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(12);

    waitFor(() => {userEvent.selectOptions(columnFilter, "rotation_period");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "igual a");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "24"); });
    waitFor(() => { userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});
    
    expect(columnFilter).toHaveValue("rotation_period");
    expect(await screen.findByText("igual a")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(24);
    expect(await screen.findByText("Coruscant")).toBeInTheDocument();

    waitFor(() => {userEvent.selectOptions(columnFilter, "diameter");});
    waitFor(() => {userEvent.selectOptions(comparisonFilter, "igual a");});
    waitFor(() => {userEvent.clear(valueFilter);});
    waitFor(() => {userEvent.type(valueFilter, "12120"); });
    waitFor(() => { userEvent.click(screen.getByRole("button", { name: "Filtrar" }));});
    
    expect(columnFilter).toHaveValue("diameter");
    expect(await screen.findByText("igual a")).toBeInTheDocument();
    expect(valueFilter).toHaveValue(12120);
    expect(await screen.findByText("Naboo")).toBeInTheDocument();
  });

  test("Verifica filtro sort", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    const inputsortColumn = screen.getByTestId("column-sort");
    const sortASC = screen.getByTestId("column-sort-input-asc");
    const sortDESC = screen.getByTestId("column-sort-input-desc");

    userEvent.selectOptions(inputsortColumn, "rotation_period");
    userEvent.click(sortASC);

    userEvent.click(screen.getByRole("button", { name: "Ordenar" }));

    expect(await screen.findByText("Bespin")).toBeInTheDocument();
    expect(await screen.findByText("Endor")).toBeInTheDocument();
    expect(await screen.findByText("Tatooine")).toBeInTheDocument();

    userEvent.selectOptions(inputsortColumn, "orbital_period");
    userEvent.click(sortDESC);

    userEvent.click(screen.getByRole("button", { name: "Ordenar" }));

    expect(await screen.findByText("Bespin")).toBeInTheDocument();
    expect(await screen.findByText("Yavin IV")).toBeInTheDocument();
    expect(await screen.findByText("Hoth")).toBeInTheDocument();
  });
  test("Verifique se a tabela tem 13 colunas", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);
    const COLUMN_ROLE_SELECTOR = 'columnheader';
    const COLUMNS_TOTAL = 13;

    expect(await screen.findAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(COLUMNS_TOTAL);
  });
});
