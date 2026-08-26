import os
from PIL import Image, ImageDraw, ImageFont

assets_dir = os.path.join(os.path.dirname(__file__), 'assets')
os.makedirs(assets_dir, exist_ok=True)

def create_icons():
    size = (64, 64)

    # 1. Phone Icon (Dark Circle + White Handset)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(26, 26, 26, 255))
    # Phone handset
    d.rounded_rectangle([20, 14, 44, 50], radius=8, fill=(255, 255, 255, 255))
    d.rectangle([25, 22, 39, 42], fill=(26, 26, 26, 255))
    d.ellipse([29, 43, 35, 48], fill=(255, 255, 255, 255))
    img.save(os.path.join(assets_dir, 'phone.png'))

    # 2. Email Icon (Dark Circle + White Envelope)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(26, 26, 26, 255))
    d.rounded_rectangle([12, 18, 52, 46], radius=4, fill=(255, 255, 255, 255))
    d.polygon([(12, 18), (32, 34), (52, 18)], fill=(26, 26, 26, 255))
    img.save(os.path.join(assets_dir, 'email.png'))

    # 3. Location Icon (Dark Circle + White Pin)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(26, 26, 26, 255))
    d.ellipse([20, 10, 44, 34], fill=(255, 255, 255, 255))
    d.polygon([(20, 28), (32, 54), (44, 28)], fill=(255, 255, 255, 255))
    d.ellipse([28, 18, 36, 26], fill=(26, 26, 26, 255))
    img.save(os.path.join(assets_dir, 'location.png'))

    # 4. LinkedIn Icon (Exact Blue Circle #0077B5 + White "in" matching Image 2!)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(0, 119, 181, 255))
    # Dot on 'i'
    d.ellipse([16, 16, 24, 24], fill=(255, 255, 255, 255))
    # Stem of 'i'
    d.rectangle([17, 28, 23, 48], fill=(255, 255, 255, 255))
    # Stem of 'n'
    d.rectangle([29, 28, 35, 48], fill=(255, 255, 255, 255))
    # Curve & right stem of 'n'
    d.ellipse([29, 28, 48, 44], fill=(255, 255, 255, 255))
    d.ellipse([35, 34, 42, 48], fill=(0, 119, 181, 255))
    d.rectangle([42, 34, 48, 48], fill=(255, 255, 255, 255))
    img.save(os.path.join(assets_dir, 'linkedin.png'))

    # 5. GitHub Icon (Cyan/Dark Circle #0F4652 + White Octocat silhouette matching Image 1!)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(15, 70, 82, 255)) # Cyan border circle
    d.ellipse([8, 8, 56, 56], fill=(255, 255, 255, 255))
    # Cat Silhouette
    d.ellipse([16, 18, 48, 50], fill=(15, 70, 82, 255))
    # Ears
    d.polygon([(16, 24), (22, 12), (28, 22)], fill=(15, 70, 82, 255))
    d.polygon([(36, 22), (42, 12), (48, 24)], fill=(15, 70, 82, 255))
    # Tail & Legs
    d.rectangle([26, 42, 30, 56], fill=(15, 70, 82, 255))
    d.rectangle([34, 42, 38, 56], fill=(15, 70, 82, 255))
    d.arc([10, 36, 26, 54], 90, 270, fill=(15, 70, 82, 255), width=4)
    img.save(os.path.join(assets_dir, 'github.png'))

    # 6. Portfolio Icon (Dark Circle + White Briefcase/Globe)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([2, 2, 62, 62], fill=(26, 26, 26, 255))
    d.rounded_rectangle([12, 20, 52, 48], radius=6, outline=(255, 255, 255, 255), width=4)
    d.rounded_rectangle([24, 12, 40, 22], radius=3, outline=(255, 255, 255, 255), width=4)
    d.line([12, 32, 52, 32], fill=(255, 255, 255, 255), width=4)
    img.save(os.path.join(assets_dir, 'portfolio.png'))

    print("Brand icons generated successfully in", assets_dir)

if __name__ == '__main__':
    create_icons()
