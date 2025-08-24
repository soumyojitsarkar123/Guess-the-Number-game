# Fake News Detection Script
# This script loads data, preprocesses text, trains classifiers, and evaluates results.

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix, roc_curve, auc
import matplotlib.pyplot as plt
import seaborn as sns

# Load the Kaggle dataset files (assume CSVs are in working directory)
df_fake = pd.read_csv('Fake.csv')    # contains fake news articles
df_true = pd.read_csv('True.csv')    # contains real news articles

# Label the data: FAKE=1, REAL=0
df_fake['label'] = 'FAKE'
df_true['label'] = 'REAL'

# Combine into a single DataFrame
df = pd.concat([df_fake, df_true]).reset_index(drop=True)

# Create a combined text field (title + body) for each article
df['content'] = df['title'] + ' ' + df['text']

# Prepare features and labels
texts = df['content'].astype(str).values       # array of combined text
labels = df['label'].map({'FAKE': 1, 'REAL': 0}).values

# Split into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.2, random_state=42, stratify=labels)

# Vectorize text using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)  # learn vocabulary on train
X_test_tfidf  = vectorizer.transform(X_test)       # apply to test data

# Initialize classifiers
lr = LogisticRegression(max_iter=1000)            # Logistic Regression
pa = PassiveAggressiveClassifier(max_iter=1000)   # Passive-Aggressive

# Train Logistic Regression
lr.fit(X_train_tfidf, y_train)
y_pred_lr = lr.predict(X_test_tfidf)
acc_lr = accuracy_score(y_test, y_pred_lr)
f1_lr  = f1_score(y_test, y_pred_lr, pos_label=1)
print(f"Logistic Regression -- Accuracy: {acc_lr:.4f}, F1-score: {f1_lr:.4f}")

# Train Passive-Aggressive Classifier
pa.fit(X_train_tfidf, y_train)
y_pred_pa = pa.predict(X_test_tfidf)
acc_pa = accuracy_score(y_test, y_pred_pa)
f1_pa  = f1_score(y_test, y_pred_pa, pos_label=1)
print(f"Passive-Aggressive -- Accuracy: {acc_pa:.4f}, F1-score: {f1_pa:.4f}")

# Compute and display confusion matrix for Logistic Regression
cm = confusion_matrix(y_test, y_pred_lr)
plt.figure(figsize=(4,3))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Real','Fake'], yticklabels=['Real','Fake'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix (Logistic Regression)')
plt.savefig('confusion_matrix.png')
plt.close()

# Compute ROC curve for Logistic Regression
y_scores = lr.predict_proba(X_test_tfidf)[:,1]  # probability of class=Fake
fpr, tpr, _ = roc_curve(y_test, y_scores)
roc_auc = auc(fpr, tpr)
plt.figure(figsize=(4,3))
plt.plot(fpr, tpr, label=f'AUC = {roc_auc:.2f}')
plt.plot([0,1],[0,1],'k--', alpha=0.5)
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve (Logistic Regression)')
plt.legend(loc='lower right')
plt.savefig('roc_curve.png')
plt.close()

# Print classification report (optional)
print("Confusion Matrix (Logistic Regression):")
print(cm)
print(f"AUC (Logistic Regression): {roc_auc:.4f}")
