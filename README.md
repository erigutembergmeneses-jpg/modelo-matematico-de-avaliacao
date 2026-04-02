# 📊 Modelo de Retorno Mensurável do Indivíduo

## Descrição

Este projeto implementa um **modelo matemático formal** que traduz a crítica sociológica sobre o capitalismo moderno apresentada no texto de referência.

O modelo calcula o **Valor Individual (Vᵢ)** baseado em três componentes:

- **R_edu**: Retorno sobre o investimento educacional
- **E**: Empregabilidade (índice de 0 a 1)
- **G**: Valor mensurável gerado (produtividade, entregas, cliques, R$/hora, etc.)

### Equação fundamental

**Vᵢ = α·R_edu + β·E + γ·G**

Onde α, β, γ são pesos definidos pelo sistema algorítmico (com α+β+γ=1).

### Lógica de descartabilidade

Se **Vᵢ < V_min** (limiar definido pelo sistema), o indivíduo é classificado como **descartável** — sujeito a demissão, desativação de plataforma ou substituição automatizada.

## 🎯 Objetivo crítico

O modelo evidencia que **subjetividade, dignidade e condições humanas não entram na equação** — apenas o retorno mensurável importa para o algoritmo.

> *"A diferença entre ontem e hoje não está na essência da lógica, mas na sua codificação: antes, o chicote e a lei racial; hoje, o algoritmo e a métrica de desempenho."*

## 📁 Estrutura do Projeto
