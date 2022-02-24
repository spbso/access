<script lang="ts">
    import {
        Column,
        Content,
        Grid,
        Header, ImageLoader, Row, StructuredList, StructuredListBody,
    } from "carbon-components-svelte";
    import ValidationResult from "./components/ValidationResult.svelte";
    import ValidationStep from "./components/ValidationStep.svelte";
    import EntranceData from "./components/EntranceData.svelte";
    import ValidationBlock from "./components/ValidationBlock.svelte";

</script>

<Header company="СПбСО" platformName="Регистрация на бал">
</Header>

<Content>
    <Grid fullWidth>
        <Row>
            <Column sm={1}>
                <ImageLoader src="stub/profile.jpeg"/>
            </Column>
            <Column>
                <Grid>
                    <Row>
                        <Column>
                            <h1>Найден Алексей Владимирович</h1>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <h2>СПО Северный Ветер</h2>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <ValidationBlock/>
                        </Column>
                        <Column>
                            <ValidationResult ok={true}/>
                        </Column>
                    </Row>
                </Grid>
            </Column>
        </Row>
        <Row>
            <Column>
                <EntranceData/>
            </Column>
        </Row>
    </Grid>
</Content>
