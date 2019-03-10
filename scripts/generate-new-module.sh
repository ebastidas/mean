#!/bin/bash

# EDIT THE FOLLOWING TO THE NEW MODULE'S NAME: - START
NEW_MODULE_NAME_IN_PLURAL_UPPERCASE=ChatAnswers
NEW_MODULE_NAME_IN_PLURAL_LOWERCASE=chatanswers
NEW_MODULE_NAME_IN_SINGULAR_UPPERCASE=ChatAnswer
NEW_MODULE_NAME_IN_SINGULAR_LOWERCASE=chatanswer
# EDIT THE FOLLOWING TO THE NEW MODULE'S NAME: - END


DIR_NAME=$NEW_MODULE_NAME_IN_PLURAL_LOWERCASE

# STEP 1: Copy and create a new folder with new module
cd .. # start in root folder (same level as folder 'modules')
cp -r modules/articles modules/$DIR_NAME
cd modules/$DIR_NAME/

# STEP 2: Replace all text in all files with new module name
grep -rli 'Articles' * | xargs -I@ sed -i '' 's/Articles/'$NEW_MODULE_NAME_IN_PLURAL_UPPERCASE'/g' @
grep -rli 'articles' * | xargs -I@ sed -i '' 's/articles/'$NEW_MODULE_NAME_IN_PLURAL_LOWERCASE'/g' @
grep -rli 'Article' * | xargs -I@ sed -i '' 's/Article/'$NEW_MODULE_NAME_IN_SINGULAR_UPPERCASE'/g' @
grep -rli 'article' * | xargs -I@ sed -i '' 's/article/'$NEW_MODULE_NAME_IN_SINGULAR_LOWERCASE'/g' @

# STEP 3: Rename all files with new name
# uncomment next command only to check which files will be renamed, but not rename them yet ('rename' command, flag '-n')
# find . -iname "*articles*" -exec rename -n 's/articles/'NEW_MODULE_NAME_IN_PLURAL_LOWERCASE'/' {} ";"
find . -iname "*articles*" -exec rename 's/articles/'$NEW_MODULE_NAME_IN_PLURAL_LOWERCASE'/' {} ";"
# uncomment next command only to check which files will be renamed, but not rename them yet ('rename' command, flag '-n')
# find . -iname "*article*" -exec rename -n 's/article/'$NEW_MODULE_NAME_IN_SINGULAR_LOWERCASE'/' {} ";"
find . -iname "*article*" -exec rename 's/article/'$NEW_MODULE_NAME_IN_SINGULAR_LOWERCASE'/' {} ";"

echo 'New module successfully created at: modules/'$DIR_NAME

##############
### SAMPLE ###

# cp -r modules/articles modules/chatmessages
# cd modules/chatmessages/
# grep -rli 'Articles' * | xargs -I@ sed -i '' 's/Articles/ChatMessages/g' @
# grep -rli 'articles' * | xargs -I@ sed -i '' 's/articles/chatmessages/g' @
# grep -rli 'Article' * | xargs -I@ sed -i '' 's/Article/ChatMessage/g' @
# grep -rli 'article' * | xargs -I@ sed -i '' 's/article/chatmessage/g' @
# # uncomment next command only to check which files will be renamed, but not rename them yet ('rename' command, flag '-n')
# # find . -iname "*articles*" -exec rename -n 's/articles/chatmessages/' {} ";"
# find . -iname "*articles*" -exec rename 's/articles/chatmessages/' {} ";"
# # uncomment next command only to check which files will be renamed, but not rename them yet ('rename' command, flag '-n')
# # find . -iname "*article*" -exec rename -n 's/article/chatmessage/' {} ";"
# find . -iname "*article*" -exec rename 's/article/chatmessage/' {} ";"
