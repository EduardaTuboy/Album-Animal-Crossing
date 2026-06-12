import json
import re
from datetime import datetime

caminho_arquivo_json = 'animal_crossing_data.json'
caminho_arquivo_sql = 'load_stickers.sql'

with open(caminho_arquivo_json, 'r', encoding='utf-8') as f:
    dados_personagens = json.load(f)

sql_comando = "INSERT INTO Stickers (number, name, species, personality, gender, rarity, url, total, catchphrase, birthday, hobbie) VALUES\n"
linhas_insert = []

for item in dados_personagens:
    number = f"{item['id']:03d}"
    
    name = item['name'].replace("'", "''")
    url = item['url']
    
    species = item['species'].lower()
    personality = item['personality'].lower()
    gender = item['gender'].lower()
    rarity = item['rarity'].lower()
    
    total = item['total']

    catchphrase = item['catchphrase'].replace("'", "''")
    hobbie = item['hobbie'].replace("'", "''")
    
    birthday_str = item.get('birthday', '')
    
    if birthday_str:
        try:
            clean_birthday = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', birthday_str)
            
            dt = datetime.strptime(f"{clean_birthday} 2000", "%B %d %Y")
            
            birthday_sql = f"'{dt.strftime('%Y-%m-%d')}'"
        except Exception as e:
            print(f"Aviso: Não foi possível processar a data do personagem ID {number}: {birthday_str}")
            birthday_sql = "NULL"
    
    linha = f"({number}, '{name}', '{species}', '{personality}', '{gender}', '{rarity}', '{url}', {total}, '{catchphrase}', {birthday_sql}, '{hobbie}')"
    linhas_insert.append(linha)

sql_comando += ",\n".join(linhas_insert) + ";\n"

with open(caminho_arquivo_sql, 'w', encoding='utf-8') as f:
    f.write(sql_comando)

print(f"O comando SQL foi gerado com sucesso em '{caminho_arquivo_sql}'.")