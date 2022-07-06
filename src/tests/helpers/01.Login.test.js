import React from "react";
import { cleanup } from "@testing-library/react";
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../../App';


describe('Testes para a página de Login', () => {
  beforeEach(cleanup);
  it('Verifica se aexiste um input name', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId("input-player-name"); 
    expect(inputName).toBeInTheDocument();
  })

  it('Verifica se aexiste um input email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se aexiste um botão com nome Play', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i }); 
    expect(playButton).toBeInTheDocument();
  })

  it('Verifica se aexiste um botão de configurações', () => {
    renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', { name: /configurações/i }); 
    expect(settingsButton).toBeInTheDocument();
  })
  it('Verifica se aexiste um botão com nome Play', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  })

  it('Verifica se inputs vazios desabilitam botão de play', async () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, '');
    expect(playButton).toBeDisabled();

    userEvent.type(inputEmail, '');
    expect(playButton).toBeDisabled();
  })

  it('verifica se input name vazio e input email preenchido desabilitam botão de play', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName,'');
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(playButton).toBeDisabled();
  })

  it('verifica se input name preenchido e input email vazio desabilitam botão de play', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName,'Jenifer');
    userEvent.type(inputEmail, '');
    expect(playButton).toBeDisabled();
  })

  it('Verifica se inputs preenchidos botão ativa e quando clicado a página é redirecionada', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', { name: /play/i });
   
    userEvent.type(inputName, 'jenifer');
    userEvent.type(inputEmail, 'test@teste.com');
    userEvent.click(playButton);
    await waitFor(() => expect(history.location.pathname).toBe('/trivia'));

  })

  it('Verifica se a função fetch foi chamada ao clicar no botão play', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
   
    userEvent.click(playButton);
    setTimeout(() => { expect(localStorage.getItem('token')).toBeDefined();
      expect(fetch).toHaveBeenCalledTimes(1)
  }, 3000)
  })

  it('Verifica ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const apiData = {
      response_code: 3,
      response_message: "Token Generated Successfully!",
      token: "8ade35cb80a213abb639a5befac4aa6c664bca56f18c506ce4a9c79d448f21b5",
  }
      // const inputEmail = screen.getByTestId("input-gravatar-email");
      // const inputName = screen.getByTestId("input-player-name");
      // const playButton = screen.getByRole('button', { name: /play/i });
      // userEvent.type(inputName, 'jenifer');
      // userEvent.type(inputEmail, 'test@teste.com');
      // userEvent.click(playButton);

    if(apiData.response_code === 3) {
      await waitFor(() => expect(history.location.pathname).toBe('/'));
      expect(localStorage.removeItem('token')).toHaveBeenCalled()
    }
  })

  it('Verifica se ao clicar em configurações a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const settingsButton = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
  })
});
