import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md'

import { ProductList } from './styles';

function Home() {
  return (
        <ProductList>
            <li>
                <img 
                    src="https://static.netshoes.com.br/produtos/tenis-nike-nightgazer-masculino/26/D12-3139-026/D12-3139-026_zoom2.jpg?ts=1601963398&ims=326x"
                    alt="Tênis"
                />

                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="button">
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img 
                    src="https://static.netshoes.com.br/produtos/tenis-nike-nightgazer-masculino/26/D12-3139-026/D12-3139-026_zoom2.jpg?ts=1601963398&ims=326x"
                    alt="Tênis"
                />

                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="button">
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img 
                    src="https://static.netshoes.com.br/produtos/tenis-nike-nightgazer-masculino/26/D12-3139-026/D12-3139-026_zoom2.jpg?ts=1601963398&ims=326x"
                    alt="Tênis"
                />

                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="button">
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img 
                    src="https://static.netshoes.com.br/produtos/tenis-nike-nightgazer-masculino/26/D12-3139-026/D12-3139-026_zoom2.jpg?ts=1601963398&ims=326x"
                    alt="Tênis"
                />

                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="button">
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img 
                    src="https://static.netshoes.com.br/produtos/tenis-nike-nightgazer-masculino/26/D12-3139-026/D12-3139-026_zoom2.jpg?ts=1601963398&ims=326x"
                    alt="Tênis"
                />

                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="button">
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
      </ProductList>
  );
}

export default Home;