---
title: Validation
sidebar_position: 6
---
To validate messages against the Open Trip Model (OTM), users can utilize the Validator Tool available in the [Semantic Treehouse (STH)](https://www.semantic-treehouse.nl/). This tool allows users to input or upload their message instances and run validation tests to check for compliance with OTM standards. After running a test, the Validator generates a report detailing any violations or inconsistencies found in the message, along with guidance on how these issues deviate from OTM standards. With this feedback, messages can be refined to comply with these standards.

How does it work?
---
1. **Log in to STH:** Go to [Semantic Treehouse (STH)](https://sutc.semantic-treehouse.nl/) and log in using your preferred method.

2. **Navigate to Validator:** Click on Validator in the sidebar on the left.

3. **Select variables:** Select your project, OTM as the message model, the latest version of OTM and its syntax.

:::warning
Add Screenshot here
:::

4. **Validation artefacts:** Select validation artefacts. Below the syntax specification dropdown, the schema and additional business rule sets that apply to the message model are shown. The checkboxes of the active business rule sets are ticked by default. Users can check or uncheck boxes themselves based on their validation preference.

:::warning
Add Screenshot here
:::

5. **Input message instance:** Provide message instance.
    1. **Option A**: Select an existing example message by using the dropdown menu at the top. Not all message models have configured example messages, maintainers can add them. Feel free to edit the example message in the edit box, if desired.

    ![](/img/validation/validation_message_example.png)

    2. **Option B**: Upload your own message instance (file with a maximum of 16MB) by clicking ➕ Choose.

    ![](/img/validation/validation_example_B.png)

    3. **Option C**: Type or paste your own message instance in the 'edit box' below. To use this option, make sure the checkbox next to 'Show editor' is checked.

    ![](/img/validation/validation_example_C.png)

6. **Run the validation:** Run validation and check the report. The Validator is now configured and ready. Click the Validate message button to start validation. The validation results will appear below when the Validator is done. The positioning is below all the input items, so please scroll down if you don't see the results right away. 
    
    1. **Validity CML syntax:** The screenshot below confirms the validity of the XML syntax (1), compliance to the XML schema (2), and adherence to all the applied business rules (3).
     
    ![](/img/validation/validation_result_1.png)

    2. **Syntax erors:** Syntax errors result in a parse error and immediately end the validation process, skipping the schema and business rules validation steps.


    ![](/img/validation/validation_result_2.png)

    2. **Applying schema validation:** Sections 2 and 3 detail results of applying schema validation and, if applicable, the business rules.



    ![](/img/validation/validation_result_3.png)


