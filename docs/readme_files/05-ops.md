# Pipeline DevOps

## CI

**Descrição**: Processos que ocorrem durante a integração e atualização de código do repositório (commits)

**Processos**:

- Atualizar README.md principal automaticamente
    - Arquivo: `generate_readme[version].yml`
    - Funcionalidade: atualiza o README.md da raíz do repositório sempre que algum arquivo localizado em `readme_files/` for alterado
    - Branches: todas, com exceção da principal