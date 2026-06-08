import json

# Caminhos dos arquivos
caminho_arquivo_json = 'animal_crossing_data.json'
caminho_arquivo_sql = 'load_stickers.sql'

# 1. Carrega os dados do JSON anterior
with open(caminho_arquivo_json, 'r', encoding='utf-8') as f:
    dados_personagens = json.load(f)

# Base do comando INSERT
sql_comando = "INSERT INTO Stickers (number, name, species, personality, gender, rarity, url, total) VALUES\n"
linhas_insert = []

# 2. Processa cada personagem para o formato SQL
for item in dados_personagens:
    # Formata o ID com 3 dígitos preenchidos com zero (ex: 1 vira 001)
    number = f"{item['id']:03d}"
    
    # Escapa aspas simples caso o nome do personagem tenha (ex: O'Hare vira O''Hare)
    name = item['name'].replace("'", "''")
    url = item['url']
    
    # Converte os campos de texto para minúsculo para bater com o seu exemplo
    species = item['species'].lower()
    personality = item['personality'].lower()
    gender = item['gender'].lower()
    rarity = item['rarity'].lower()
    
    # Mantém o total vindo do JSON
    total = item['total']


    catchphrase = item['catchphrase'].replace("'", "''")
    hobbie = item['hobbie']
    
    # Monta a linha de valores do SQL
    linha = f"({number}, '{name}', '{species}', '{personality}', '{gender}', '{rarity}', '{url}', {total}, '{catchphrase}', '{hobbie}')"
    linhas_insert.append(linha)

# 3. Junta todas as linhas separando por vírgula e finaliza com ponto e vírgula
sql_comando += ",\n".join(linhas_insert) + ";"

# 4. Salva o comando em um arquivo .sql
with open(caminho_arquivo_sql, 'w', encoding='utf-8') as f:
    f.write(sql_comando)

print(f"O comando SQL foi gerado com sucesso em '{caminho_arquivo_sql}'.")