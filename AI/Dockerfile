# Base image
FROM python:3.8

# Set the working directory
WORKDIR /app

# 필요한 라이브러리 설치
RUN apt-get update && apt-get install -y \
    libgl1-mesa-dev \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# 기타 필요한 Python 라이브러리 설치
RUN pip install opencv-python-headless

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "inference/inference.py"]
