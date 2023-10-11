# Użyj obrazu bazowego Node.js
FROM node:14

# Ustal katalog roboczy
WORKDIR /app

# Skopiuj plik package.json i package-lock.json (jeśli istnieją)
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików aplikacji
COPY . .

# Skompiluj aplikację (opcjonalne, w zależności od konieczności)
# RUN npm run build

# Port, na którym działa aplikacja React (możesz zmienić, jeśli inny port jest używany)
EXPOSE 80

# Komenda do uruchomienia aplikacji
CMD ["npm", "start"]
