import matplotlib.pyplot as plt 

def save_validation(labels, masks, input_images, pred_images, pred_masks, comp_images,  epoch, save_dir):
    plt.figure(dpi=128)
    plt.subplot(231)
    plt.imshow(labels[0, 0].cpu().detach().numpy(), cmap='gray')
    plt.title("original")
    plt.subplot(232)
    plt.imshow(masks[0, 0].cpu().detach().numpy(), cmap='gray')
    plt.title("mask")
    plt.subplot(233)
    plt.imshow(input_images[0, 0].cpu().detach().numpy(), cmap='gray')
    plt.title('input image')
    plt.subplot(234)
    plt.imshow(pred_images[0, 0].cpu().detach().numpy(), cmap='gray')
    plt.title('pred before image')
    # plt.subplot(235)
    # plt.imshow(pred_masks[0, 0].cpu().detach().numpy(), cmap='gray')
    # plt.title('pred Discriminator mask')
    plt.subplot(236)
    plt.imshow(comp_images[0, 0].cpu().detach().numpy(), cmap='gray')
    plt.title('Result image')
    plt.tight_layout()
    # plt.savefig(os.path.join(save_dir, f'epoch_{epoch}.png'))
    plt.show()
    plt.close()
