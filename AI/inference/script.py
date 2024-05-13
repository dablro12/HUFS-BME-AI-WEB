import argparse
from inference import InpaintingService
import os 

def parse_arguments():
    parser = argparse.ArgumentParser(description="Inpainting Service Arguments")
    
    parser.add_argument('--env', type = str,required= True,
                        help = 'Seeting your OS')

    parser.add_argument('--project_dir', type = str,required= True,
                        help = 'Git Project Present PATH')

    parser.add_argument("--img_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/img',
                        help="Path to the directory containing input images.")
    
    parser.add_argument("--mask_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/mask',
                        help="Path to the directory containing mask images.")
    
    parser.add_argument("--model_name", type=str, default='ocigan',
                        help="name to the trained model.")
    
    parser.add_argument("--model_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/AI/inference/model/weight/',
                        help="Dir to the trained models.")
    
    parser.add_argument("--save_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res',
                        help="Path to save the resulting images.")
    
    parser.add_argument("--visual_save_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res_compare',
                        help="Path to save visualizations. Default is the save_path.")
    
    parser.add_argument("--batch_size", type=int, default=1,
                        help="Batch size for inference. Default is 1.")
    
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    inpainting_service = InpaintingService(
        img_dir = os.path.join(args.project_dir, args.img_dir),
        mask_dir = os.path.join(args.project_dir, args.mask_dir),
        model_name = args.model_name,
        model_path = os.path.join(args.project_dir, args.model_dir, args.model_name + '.pt'),# model weight path 
        save_path = os.path.join(args.project_dir, args.save_dir),
        visual_save_path = os.path.join(args.project_dir, args.visual_save_dir),
        sql_config_path = os.path.join(args.project_dir, 'AI/inference/mysql_config.json'),
        batch_size = args.batch_size
    )

    inpainting_service.infer()
