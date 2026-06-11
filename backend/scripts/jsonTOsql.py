import json
import re
from datetime import datetime

# Caminhos dos arquivos
caminho_arquivo_json = 'animal_crossing_data.json'
caminho_arquivo_sql = 'load_stickers.sql'

# 1. Carrega os dados do JSON anterior
with open(caminho_arquivo_json, 'r', encoding='utf-8') as f:
    dados_personagens = json.load(f)

# Base do comando INSERT atualizada para contemplar todas as 11 colunas do seu novo schema SQL
sql_comando = "INSERT INTO Stickers (number, name, species, personality, gender, rarity, url, total, catchphrase, birthday, hobbie) VALUES\n"
linhas_insert = []

# 2. Processa cada personagem para o formato SQL
for item in dados_personagens:
    # Formata o ID com 3 dígitos preenchidos com zero (ex: 1 vira 001)
    number = f"{item['id']:03d}"
    
    # Escapa aspas simples caso o nome do personagem tenha (ex: O'Hare vira O''Hare)
    name = item['name'].replace("'", "''")
    url = item['url']
    
    # Converte os campos de texto para minúsculo para bater com o seu exemplo original
    species = item['species'].lower()
    personality = item['personality'].lower()
    gender = item['gender'].lower()
    rarity = item['rarity'].lower()
    
    # Mantém o total vindo do JSON
    total = item['total']

    # Novos campos escapados contra aspas simples
    catchphrase = item['catchphrase'].replace("'", "''")
    hobbie = item['hobbie'].replace("'", "''")
    
    # --- FORMATAÇÃO DO ANIVERSÁRIO (De "February 16th" para "2000-02-16") ---
    birthday_str = item.get('birthday', '')
    birthday_sql = "NULL" # Valor padrão caso esteja vazio
    
    if birthday_str:
        try:
            # Expressão regular para remover os sufixos ordinais (st, nd, rd, th) anexados ao número do dia
            # Exemplo: "February 16th" vira "February 16"
            clean_birthday = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', birthday_str)
            
            # Realiza o parse anexando o ano fictício fixo 2000 para que o tipo DATE aceite
            dt = datetime.strptime(f"{clean_birthday} 2000", "%B %d %Y")
            
            # Formata a string de saída no padrão ISO internacional ('YYYY-MM-DD') envolvida em aspas para o SQL
            birthday_sql = f"'{dt.strftime('%Y-%m-%d')}'"
        except Exception as e:
            # Em caso de erro de formatação na string do JSON, insere NULL para não quebrar o script SQL
            print(f"Aviso: Não foi possível processar a data do personagem ID {number}: {birthday_str}")
            birthday_sql = "NULL"
    
    # Monta a linha de valores do SQL respeitando perfeitamente a ordem declarada no cabeçalho do INSERT
    linha = f"({number}, '{name}', '{species}', '{personality}', '{gender}', '{rarity}', '{url}', {total}, '{catchphrase}', {birthday_sql}, '{hobbie}')"
    linhas_insert.append(linha)

# 3. Junta todas as linhas separando por vírgula e finaliza com ponto e vírgula
sql_comando += ",\n".join(linhas_insert) + ";\n"

# 4. Salva o comando em um arquivo .sql
with open(caminho_arquivo_sql, 'w', encoding='utf-8') as f:
    f.write(sql_comando)

print(f"O comando SQL foi gerado com sucesso em '{caminho_arquivo_sql}'.")