with open("game que gosto-v7.js", "r", encoding="utf-8") as f:
    content = f.read()

with open("game que gosto-v7.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Ficheiro game que gosto-v7.js pronto:", len(content), "caracteres")