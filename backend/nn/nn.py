import torch

model = torch.load('model/pneumatic_recognitionV1.pth')

def make_prediction(image):
    model.eval()
    prediction = model(image)
    return prediction