#!/bin/bash

# Activate your virtual environment if needed
# source /home/eiden/anaconda3/bin/activate eiden
# Run the Python script with arguments
#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
python3 "$DIR/script.py" \
    --env "APPLE" \
    --project_dir "/Users/jeong-yeongjin/HUFS-BME-AI-WEB/HUFS-BME-AI-WEB" \
    --img_dir 'WEB/inference/img' \
    --mask_dir 'WEB/inference/mask' \
    --model_path 'AI/inference/model/weight/OCI-GAN-Generator.pt' \
    --save_dir 'WEB/inference/res' \
    --visual_save_dir 'WEB/inference/res_compare' \
    --batch_size 1
